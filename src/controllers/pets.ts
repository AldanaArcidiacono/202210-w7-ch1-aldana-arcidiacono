import { NextFunction, Request, Response } from 'express';
import { Pets } from '../interface/pets.js';
import fs from 'fs/promises';
//import importData from '../db.json' assert { type: 'json' };

//let data: Array<Pets> = importData.pets;

const file = './src/db.json';
const data = await fs.readFile(file);
let pets: Array<Pets> = JSON.parse(data.toLocaleString());

export class PetsController {
    getAll(req: Request, res: Response) {
        res.json(pets);
        res.end();
    }

    get(req: Request, resp: Response) {
        pets = pets.filter((item) => item.id === +req.params.id);
        resp.json(pets);
        resp.end();
    }

    post(req: Request, res: Response) {
        const newPet = {
            ...req.body,
            id: pets.length + 1,
        };
        pets.push(newPet);
        res.json(newPet);
        res.end();
    }

    patch(req: Request, res: Response) {
        const updatePet = {
            ...pets.find((item) => item.id === +req.params.id),
            ...req.body,
        };
        pets[pets.findIndex((item) => item.id === +req.params.id)] = updatePet;
        res.json(updatePet);
        res.end();
    }

    delete(req: Request, res: Response, next: NextFunction) {
        if (!pets.find((item) => item.id === +req.params.id)) {
            next(new Error('Not found'));
            return;
        }
        pets = pets.filter((item) => item.id !== +req.params.id);
        res.json({});
        res.end();
    }
}
