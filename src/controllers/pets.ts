import { NextFunction, Request, Response } from 'express';
import { Pets } from '../interface/pets.js';
import importData from '../db.json' assert { type: 'json' };

// eslint-disable-next-line prefer-const
let data: Array<Pets> = importData.pets;

export class PetsController {
    getAll(req: Request, res: Response) {
        res.json(data);
        res.end();
    }

    post(req: Request, res: Response) {
        const newPet = {
            ...req.body,
            id: data.length + 1,
        };
        data.push(newPet);
        res.json(newPet);
        res.end();
    }

    patch(req: Request, res: Response) {
        const updatePet = {
            ...data.find((item) => item.id === +req.params.id),
            ...req.body,
        };
        data[data.findIndex((item) => item.id === +req.params.id)] = updatePet;
        res.json(updatePet);
        res.end();
    }

    delete(req: Request, res: Response, next: NextFunction) {
        if (!data.find((item) => item.id === +req.params.id)) {
            next(new Error('Not found'));
            return;
        }
        data = data.filter((item) => item.id !== +req.params.id);
        res.json({});
        res.end();
    }
}

// import fs from 'fs/promises';
// (async () => {
//     const file = '../../dist/db.json';
//     const data = await fs.readFile(file);
//     console.log(data.toLocaleString());
// })();
// let data: Array<Pets> = fs.
