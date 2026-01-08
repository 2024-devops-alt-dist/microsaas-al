import { Router } from 'express';
import { ImageController } from '../controllers/image.controller';

export default function imageRoutes(imageController: ImageController) {
    const router = Router();
    router.get('/', imageController.findAll);
    router.get('/:id', imageController.findById);
    router.post('/', imageController.create);
    router.put('/:id', imageController.update);
    router.delete('/:id', imageController.delete);
    return router;
}
