import { Router } from 'express';
import { PetsController } from '../controllers/pets.js';
import { PetFileData } from '../data/pets.file.data.js';

export const petRouter = Router();

const controller = new PetsController(new PetFileData());

petRouter.get('/', controller.getAll.bind(controller));
petRouter.get('/:id', controller.get.bind(controller));
petRouter.post('/', controller.post.bind(controller));
petRouter.patch('/:id', controller.patch.bind(controller));
petRouter.delete('/:id', controller.delete.bind(controller));
