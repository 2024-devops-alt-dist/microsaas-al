import { Router } from 'express';
import { MushroomController } from '../controllers/mushroom.controller';

export default function mushroomRoutes(mushroomController: MushroomController) {
    const router = Router();
    router.get('/', mushroomController.findAll);
    router.get('/:id', mushroomController.findById);
    router.post('/', mushroomController.create);
    router.put('/:id', mushroomController.update);
    router.delete('/:id', mushroomController.delete);
    return router;
}
