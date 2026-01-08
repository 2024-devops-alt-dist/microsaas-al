import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export default function userRoutes(userController: UserController) {
    const router = Router();
    router.get('/', userController.findAll);
    router.get('/:id', userController.findById);
    router.get('/:email', userController.findByEmail);
    router.post('/', userController.create);
    router.put('/:id', userController.update);
    router.delete('/:id', userController.delete);
    return router;
}
