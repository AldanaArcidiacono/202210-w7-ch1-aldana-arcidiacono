import { Request, Response } from 'express';
import { PetsController } from './pets';

describe('Given TaskController', () => {
    const petsController = new PetsController();
    const req = {};
    const resp = {
        json: jest.fn(),
        end: jest.fn(),
    };
    test('Then ... getAll', () => {
        petsController.getAll(req as Request, resp as unknown as Response);
        expect(resp.json).toHaveBeenCalled();
        expect(resp.end).toHaveBeenCalled();
    });
});
