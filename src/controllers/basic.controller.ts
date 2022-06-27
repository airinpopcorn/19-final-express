/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { iAppModel } from '../models/app.model';

export class BasicController<T> {
    constructor(public model: iAppModel<T>) {}

    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.send(JSON.stringify(await this.model.appFind()));
    };

    getController = async (req: Request, resp: Response) => {
        resp.setHeader('Content-type', 'application/json');
        console.log(req.params.id);
        const result = await this.model.appFindById(req.params.id);
        if (result) {
            resp.send(JSON.stringify(result));
        } else {
            resp.status(404);
            resp.send(JSON.stringify({}));
        }
    };

    postController = async (req: Request, resp: Response) => {
        const newItem = await this.model.create(req.body);
        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.send(JSON.stringify(newItem));
    };

    patchController = async (req: Request, resp: Response) => {
        const newItem = await this.model.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        resp.setHeader('Content-type', 'application/json');
        resp.send(JSON.stringify(newItem));
    };

    deleteController = async (req: Request, resp: Response) => {
        const deleteItem = await this.model.findByIdAndDelete(req.params.id);
        if (deleteItem === null) {
            resp.status(404);
            resp.send(JSON.stringify({ error: 'Delete impossible' }));
        } else {
            resp.status(202);
            resp.send(JSON.stringify({ deleteItem }));
        }
    };
}
