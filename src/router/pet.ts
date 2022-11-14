import { Router } from 'express';
import { PetsController } from '../controllers/pets.js';

export const petRouter = Router();

const controller = new PetsController();

petRouter.get('/', controller.getAll);
petRouter.get('/:id', controller.get);
petRouter.post('/', controller.post);
petRouter.patch('/:id', controller.patch);
petRouter.delete('/:id', controller.delete);
