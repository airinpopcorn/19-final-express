import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import path from 'path'

// import homeRouter from './router/home.js';
// import { taskRouter } from './router/task.js';
// import { notesRouter } from './router/notes.js';
import { taskRouter } from './routers/router.task.js';
import { userRouter } from './routers/router.user.js';

export const app = express();

// Middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// app.use('/', homeRouter);
app.use('/task', taskRouter);
app.use('/user', userRouter);
// app.use('/books', bookRouter);

app.use((error: Error, req: Request, resp: Response, next: NextFunction) => {
    req;
    resp;
    next;
    let status = 500;
    switch (error.name) {
        case 'ValidationError':
            status = 406;
            break;

        case 'ReferenceError':
            status = 404;
            break;

        case 'URIErrir':
            status = 400;
            break;

        default:
            status;
            break;
    }

    resp.status(status);
    const result = {
        status: status,
        type: error.name,
        error: error.message,
    };
    resp.send(JSON.stringify(result));
});
