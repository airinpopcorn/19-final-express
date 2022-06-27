import { Router } from 'express';
import { BasicController } from '../controllers/basic.controller.js';
import { Task } from '../models/task.model.js';

export const taskController = new BasicController(Task);
export const taskRouter = Router();

taskRouter.get('/', taskController.getAllController);
taskRouter.get('/:id', taskController.getController);
taskRouter.post('/', taskController.postController);
taskRouter.patch('/:id', taskController.patchController);
taskRouter.delete('/:id', taskController.deleteController);
