import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function mongooseConnect() {
    const url = process.env.URL_MONGO;
    return mongoose.connect(url as string);
}

export interface iRelationField {
    type: mongoose.Types.ObjectId;
    ref: string;
}
//Opción para no tener mongoose en un fichero aparte sino que se puede llamar a la función directamente en el modelo
// await mongoose.connect(process.env.URL_MONGO as string)
