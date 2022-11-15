import { NextFunction, Request, Response } from 'express';
import { Pet } from '../interface/pets.js';
import { Data } from '../data/data.js';
import { HTTPError } from '../interface/error.js';

export class PetsController {
    constructor(public dataModel: Data<Pet>) {}

    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.getAll();
            res.json(data).end();
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }

    async get(req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.get(+req.params.id);
            resp.json(data).end();
        } catch (error) {
            if ((error as Error).message === 'Not found id') {
                const httpError = new HTTPError(
                    404,
                    'Not Found',
                    (error as Error).message
                );
                next(httpError);
                return;
            }
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }

    async post(req: Request, res: Response, next: NextFunction) {
        if (!req.body.name) {
            const httpError = new HTTPError(
                406,
                'Not Acceptable',
                'Name must be included in the data'
            );
            next(httpError);
            return;
        }
        try {
            const newPet = await this.dataModel.post(req.body);
            res.json(newPet).end();
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }

    async patch(req: Request, res: Response, next: NextFunction) {
        try {
            const updatePet = await this.dataModel.patch(
                +req.params.id,
                req.body
            );
            res.json(updatePet).end();
        } catch (error) {
            if ((error as Error).message === 'ID Not Found') {
                const httpError = new HTTPError(
                    404,
                    'Not Found',
                    (error as Error).message
                );
                next(httpError);
                return;
            }
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await this.dataModel.delete(+req.params.id);
            res.json({}).end();
        } catch (error) {
            if ((error as Error).message === 'ID Not Found') {
                const httpError = new HTTPError(
                    404,
                    'Not Found',
                    (error as Error).message
                );
                next(httpError);
                return;
            }
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }
}
