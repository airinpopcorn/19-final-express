/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';

export interface iAppModel<T> extends mongoose.Model<mongoose.Schema> {
    appFind: Function;
    appFindById: Function;
}
