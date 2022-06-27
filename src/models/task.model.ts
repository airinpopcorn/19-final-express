/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
import { iAppModel } from './app.model.js';

// const connect =
async () => {
    await mongooseConnect();
};

// connect.disconnect()
export interface iTask {
    id: string;
    title: string;
    responsible: string;
    isCompleted: boolean;
}

const taskSchema = new mongoose.Schema({
    title: String,
    responsible: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    isCompleted: { type: Boolean, default: false },
});

taskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    },
});

export const Task = mongoose.model('Task', taskSchema);

(Task as unknown as iAppModel<mongoose.Schema>).appFind = () => {
    Task.find().populate('responsible', { tasks: 0 });
};

(Task as unknown as iAppModel<mongoose.Schema>).appFindById = (id: string) => {
    Task.findById({ id });
};
