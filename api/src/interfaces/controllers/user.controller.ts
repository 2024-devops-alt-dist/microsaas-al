import { Request, Response, NextFunction } from 'express';
import { FindAllUsers } from '../../usecases/user/findAllUsers.js';
import { FindUserById } from '../../usecases/user/findUserById.js';
import { FindUserByEmail } from '../../usecases/user/findUserByEmail.js';
import { CreateUser } from '../../usecases/user/createUser.js';
import { UpdateUser } from '../../usecases/user/updateUser.js';
import { DeleteUser } from '../../usecases/user/deleteUser.js';

export class UserController {
    constructor(
        private findAllUsersUseCase: FindAllUsers,
        private findUserByIdUseCase: FindUserById,
        private findUserByEmailUseCase: FindUserByEmail,
        private createUserUseCase: CreateUser,
        private updateUserUseCase: UpdateUser,
        private deleteUserUseCase: DeleteUser,
    ) {}

    findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await this.findAllUsersUseCase.execute();
            res.status(200).send(users);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.findUserByIdUseCase.execute(Number(req.params.id));
            if (user) res.status(200).send(user);
            else res.status(404).send({ message: 'User not found' });
        } catch (error) {
            next(error);
        }
    };

    findByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.findUserByEmailUseCase.execute(req.params.email as string);
            if (user) res.status(200).send(user);
            else res.status(404).send({ message: 'User not found' });
        } catch (error) {
            next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newUser = await this.createUserUseCase.execute(req.body);
            res.status(201).send(newUser);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const updatedUser = await this.updateUserUseCase.execute(
                Number(req.params.id),
                req.body,
            );
            res.status(200).send(updatedUser);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.deleteUserUseCase.execute(Number(req.params.id));
            res.status(200).send({ message: 'User deleted successfully' });
        } catch (error) {
            next(error);
        }
    };
}
