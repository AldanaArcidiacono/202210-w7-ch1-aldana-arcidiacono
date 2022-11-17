import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data.js';
import { HTTPError } from '../interface/error.js';
import { Film } from '../interface/films.js';

export class FilmsController {
    constructor(public repository: Data<Film>) {}

    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const films = await this.repository.getAll();
            res.json({ films });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const films = await this.repository.get(req.params.id);
            res.json({ films });
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }

    async post(req: Request, res: Response, next: NextFunction) {
        try {
            const films = await this.repository.post(req.body);
            res.json({ films });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async patch(req: Request, res: Response, next: NextFunction) {
        try {
            const films = await this.repository.patch(req.params.id, req.body);
            res.json({ films });
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await this.repository.delete(req.params.id);
            res.json({});
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }

    #createHttpError(error: Error) {
        if ((error as Error).message === 'Not found id') {
            const httpError = new HTTPError(
                404,
                'Not Found',
                (error as Error).message
            );
            return httpError;
        }
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            (error as Error).message
        );
        return httpError;
    }
}
