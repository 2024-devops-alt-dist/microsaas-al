import express from 'express';
import { config } from './config/env';
import logger from './utils/logger';
import { pool } from './infrastructure/database/pg/client';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware';
import { UserRepository } from './infrastructure/user.repository';
import { CreateUser } from './usecases/user/createUser';
import { UserController } from './interfaces/controllers/user.controller';
import { FindAllUsers } from './usecases/user/findAllUsers';
import userRoutes from './interfaces/routes/user.routes';
import { FindUserById } from './usecases/user/findUserById';
import { UpdateUser } from './usecases/user/updateUser';
import { DeleteUser } from './usecases/user/deleteUser';
import { FindUserByEmail } from './usecases/user/findUserByEmail';
import { MushroomRepository } from './infrastructure/mushroom.repository';
import { FindAllMushrooms } from './usecases/mushroom/findAllMushrooms';
import { FindMushroomById } from './usecases/mushroom/findMushroomById';
import { CreateMushroom } from './usecases/mushroom/createMushroom';
import { DeleteMushroom } from './usecases/mushroom/deleteMushroom';
import { MushroomController } from './interfaces/controllers/mushroom.controller';
import { UpdateMushroom } from './usecases/mushroom/updateMushroom';
import mushroomRoutes from './interfaces/routes/mushroom.routes';

const app = express();

app.use(
    cors({
        origin: config.FRONT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    }),
);

app.use(express.json());

const userRepository = new UserRepository();
const createUserUseCase = new CreateUser(userRepository);
const findAllUsersUseCase = new FindAllUsers(userRepository);
const findUserByIdUseCase = new FindUserById(userRepository);
const findUserByEmailUseCase = new FindUserByEmail(userRepository);
const updateUserUseCase = new UpdateUser(userRepository);
const deleteUserUseCase = new DeleteUser(userRepository);
const userController = new UserController(
    findAllUsersUseCase,
    findUserByIdUseCase,
    findUserByEmailUseCase,
    createUserUseCase,
    updateUserUseCase,
    deleteUserUseCase,
);

const mushroomRepository = new MushroomRepository();
const findAllMushrooms = new FindAllMushrooms(mushroomRepository);
const findMushroomById = new FindMushroomById(mushroomRepository);
const createMushroom = new CreateMushroom(mushroomRepository);
const updateMushroom = new UpdateMushroom(mushroomRepository);
const deleteMushroom = new DeleteMushroom(mushroomRepository);
const mushroomController = new MushroomController(
    findAllMushrooms,
    findMushroomById,
    createMushroom,
    updateMushroom,
    deleteMushroom,
);

app.use('/users', userRoutes(userController));
app.use('/mushrooms', mushroomRoutes(mushroomController));

app.use(errorHandler);

app.get('/api/health', async (_req, res) => {
    try {
        await pool.query('SELECT 1');
        res.send({
            status: 'ok',
            message: 'API connected to database!',
        });
    } catch (error) {
        logger.error('Database query error:', error);
        res.status(500).send({
            status: 'error',
            message: 'Database connection failed',
        });
    }
});

export default app;
