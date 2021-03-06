/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { iAppModel } from '../models/app.model';
import { iTask, Task } from '../models/task.model';
import { BasicController } from './basic.controller';

jest.mock('../models/task.model');

describe('Given a instantiated controller DataController', () => {
    let controller: BasicController<iTask>;
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: NextFunction;
    beforeEach(() => {
        req = {
            params: { id: '1' },
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            send: jest.fn(),
        };
        controller = new BasicController(
            Task as unknown as iAppModel<mongoose.Schema>
        ) as BasicController<iTask>;
    });
    describe('When method getAllController is called', () => {
        test('Then resp.end should be called', async () => {
            const mockResult = [{ test: 'test' }];
            Task.find = jest.fn().mockResolvedValue(mockResult);
            await controller.getAllController(req as Request, resp as Response);
            expect(resp.send).toHaveBeenCalled();
        });
    });

    describe('When method getController is called', () => {
        test('And response is ok, then resp.end should be called with data', async () => {
            const result = { test: 'test' };
            (Task as unknown as iAppModel<mongoose.Schema>).find = jest
                .fn()
                .mockResolvedValue(result);
            await controller.getController(req as Request, resp as Response);
            expect(resp.send).toHaveBeenCalled();
        });
        test('And response is not ok, then resp.end should be called without data', async () => {
            const result = null;
            Task.find = jest.fn().mockResolvedValue(result);
            await controller.getController(req as Request, resp as Response);
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
            expect(resp.status).toHaveBeenCalledWith(404);
        });
    });

    describe('When method postController is called', () => {
        test('Then resp.end should be called with data', async () => {
            const result = { test: 'test' };
            Task.create = jest.fn().mockResolvedValue(result);
            await controller.postController(req as Request, resp as Response);
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify(result));
        });
    });

    describe('When method patchController is called', () => {
        test('Then resp.end should be called with data', async () => {
            const result = { test: 'test' };
            Task.findByIdAndUpdate = jest.fn().mockResolvedValue(result);
            await controller.patchController(req as Request, resp as Response);
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify(result));
        });
    });

    describe('When method deleteController is called', () => {
        test('Then res.status should be called with status', async () => {
            const result = { status: 202 };
            Task.findByIdAndDelete = jest.fn().mockResolvedValue(result);
            await controller.deleteController(req as Request, resp as Response);
            expect(resp.status).toHaveBeenCalledWith(202);
        });
    });
});
