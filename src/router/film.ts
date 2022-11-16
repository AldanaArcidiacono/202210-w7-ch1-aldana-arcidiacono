import { Router } from 'express';
import { FilmsController } from '../controllers/films.js';
import { FilmsFileData } from '../data/films.file.data.js';

export const filmsRouter = Router();

const controller = new FilmsController(new FilmsFileData());

filmsRouter.get('/', controller.getAll.bind(controller));
filmsRouter.get('/:id', controller.get.bind(controller));
filmsRouter.post('/', controller.post.bind(controller));
filmsRouter.patch('/:id', controller.patch.bind(controller));
filmsRouter.delete('/:id', controller.delete.bind(controller));
