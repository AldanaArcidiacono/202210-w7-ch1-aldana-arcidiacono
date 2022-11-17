import { NextFunction, Request, Response } from 'express';
import { FilmsRepository } from '../data/films.repository';
import { FilmsController } from './films';

jest.mock('../data/films.repository');

describe('Given FilmsController', () => {
    describe('When we instantiate the methods', () => {
        FilmsRepository.prototype.getAll = jest
            .fn()
            .mockResolvedValue(['Harry']);
        FilmsRepository.prototype.get = jest
            .fn()
            .mockResolvedValue(['45asd21d']);
        const repository = new FilmsRepository();
        const filmsController = new FilmsController(repository);
        const req: Partial<Request> = {};
        const res: Partial<Response> = {
            json: jest.fn(),
        };
        const next: NextFunction = jest.fn();

        test('Then if we use getAll(), it should have been called', async () => {
            await filmsController.getAll(req as Request, res as Response, next);
            expect(res.json).toHaveBeenCalledWith({ films: ['Harry'] });
        });

        test('Then if we use get(), it should have been called', async () => {
            await filmsController.get(req as Request, res as Response, next);
            expect(res.json).toHaveBeenCalled();
        });
    });
});
