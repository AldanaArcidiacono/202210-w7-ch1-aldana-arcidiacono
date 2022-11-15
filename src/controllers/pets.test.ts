import { NextFunction, Request, Response } from 'express';
import { PetFileData } from '../data/pets.file.data';
import { PetsController } from './pets';

describe('Given PetsController', () => {
    let model: PetFileData;
    let petsController: PetsController;
    let req: Request;
    let res: Response;
    let next: NextFunction;
    beforeEach(() => {
        model = new PetFileData();
        petsController = new PetsController(model);
        (req as Partial<Request>) = {};
        (res as Partial<Response>) = {
            json: jest.fn(),
            end: jest.fn(),
        };
        next = jest.fn();
    });
    // test('Then when we instantiate getAll(), it should been called', () => {
    //     petsController.getAll(
    //         req as Request,
    //         res as Response,
    //         next as NextFunction
    //     );
    //     expect(res.json).toHaveBeenCalled();
    //     expect(res.end).toHaveBeenCalled();
    // });
});
