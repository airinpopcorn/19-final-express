import { Router } from 'express';
import mongoose from 'mongoose';
import { BasicController } from '../controllers/basic.controller.js';
import { iAppModel } from '../models/app.model.js';
import { User } from '../models/user.model.js';

export const userController = new BasicController(
    User as unknown as iAppModel<mongoose.Schema>
);
export const userRouter = Router();

userRouter.get('/', userController.getAllController);
userRouter.get('/:id', userController.getController);
userRouter.post('/', userController.postController);
userRouter.patch('/:id', userController.patchController);
userRouter.delete('/:id', userController.deleteController);
