import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { petRouter } from './router/pet.js';
import { filmsRouter } from './router/film.js';
import { CustomError } from './interface/error.js';

export const app = express();
app.disable('x-powered-by');

const corsOptions = {
    origin: '*',
};
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    const origin = req.header('Origin') || '*';
    res.setHeader('Access-Control-Allow-Origin', origin as string);
    next();
});

app.get('/', (_req, res) => {
    res.send('API of pets and films. Write /pets or /films to access').end();
});

app.use('/pets', petRouter);
app.use('/films', filmsRouter);

app.use(
    (
        error: CustomError,
        _req: Request,
        resp: Response,
        _next: NextFunction
    ) => {
        console.log(
            error.name,
            error.statusCode,
            error.statusMessage,
            error.message
        );
        let status = error.statusCode || 500;
        if (error.name === 'ValidationError') {
            status = 406;
        }
        const result = {
            status: status,
            type: error.name,
            error: error.message,
        };
        resp.status(status).json(result).end();
    }
);
