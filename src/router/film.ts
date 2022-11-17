import { Router } from 'express';
import { FilmsController } from '../controllers/films.js';
import { FilmsRepository } from '../data/films.repository.js';

export const filmsRouter = Router();

const controller = new FilmsController(new FilmsRepository());

filmsRouter.get('/', controller.getAll.bind(controller));
filmsRouter.get('/:id', controller.get.bind(controller));
filmsRouter.post('/', controller.post.bind(controller));
filmsRouter.patch('/:id', controller.patch.bind(controller));
filmsRouter.delete('/:id', controller.delete.bind(controller));
