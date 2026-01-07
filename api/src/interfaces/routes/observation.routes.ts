import { Router } from 'express';
import { ObservationController } from '../controllers/observation.controller';

export default function observationRoutes(observationController: ObservationController) {
    const router = Router();
    router.get('/', observationController.findAll);
    router.get('/:id', observationController.findById);
    router.post('/', observationController.create);
    router.put('/:id', observationController.update);
    router.delete('/:id', observationController.delete);
    return router;
}
