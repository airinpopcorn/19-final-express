import mongoose from 'mongoose';
import { iRelationField, mongooseConnect } from '../db/mongoose.js';
import { iAppModel } from './app.model.js';

// const connect =
async () => {
    await mongooseConnect();
};

// connect.disconnect()
export interface iUser {
    id: string;
    name: string;
    email: string;
    tasks: Array<iRelationField>;
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: String,
    tasks: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    },
});

export const User = mongoose.model('User', userSchema);

(User as unknown as iAppModel<mongoose.Schema>).appFind = () => {
    User.find().populate('tasks', { responsible: 0 });
};

(User as unknown as iAppModel<mongoose.Schema>).appFindById = (id: string) => {
    User.findById({ id });
};
