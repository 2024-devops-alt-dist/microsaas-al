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
import { ObservationRepository } from './infrastructure/observation.repository';
import { FindAllObservations } from './usecases/observation/findAllObservations';
import { FindObservationById } from './usecases/observation/findObservationById';
import { CreateObservation } from './usecases/observation/createObservation';
import { UpdateObservation } from './usecases/observation/updateObservation';
import { DeleteObservation } from './usecases/observation/deleteObservation';
import { ObservationController } from './interfaces/controllers/observation.controller';
import observationRoutes from './interfaces/routes/observation.routes';
import { ImageRepository } from './infrastructure/image.repository';
import { FindAllImages } from './usecases/image/findAllImages';
import { FindImageById } from './usecases/image/findImageById';
import { CreateImage } from './usecases/image/createImage';
import { UpdateImage } from './usecases/image/updateImage';
import { DeleteImage } from './usecases/image/deletImage';
import { ImageController } from './interfaces/controllers/image.controller';
import imageRoutes from './interfaces/routes/image.routes';
import { CommentRepository } from './infrastructure/comment.repository';
import { FindAllComments } from './usecases/comment/findAllComments';
import { FindCommentById } from './usecases/comment/findCommentById';
import { CreateComment } from './usecases/comment/createComment';
import { UpdateComment } from './usecases/comment/updateComment';
import { DeleteComment } from './usecases/comment/deleteComment';
import { CommentController } from './interfaces/controllers/comment.controller';
import commentRoutes from './interfaces/routes/comment.routes';

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

const observationRepository = new ObservationRepository();
const findAllObservations = new FindAllObservations(observationRepository);
const findObservationById = new FindObservationById(observationRepository);
const createObservation = new CreateObservation(observationRepository);
const updateObservation = new UpdateObservation(observationRepository);
const deleteObservation = new DeleteObservation(observationRepository);
const observationController = new ObservationController(
    findAllObservations,
    findObservationById,
    createObservation,
    updateObservation,
    deleteObservation,
);

const imageRepository = new ImageRepository();
const findAllImages = new FindAllImages(imageRepository);
const findImageById = new FindImageById(imageRepository);
const createImage = new CreateImage(imageRepository);
const updateImage = new UpdateImage(imageRepository);
const deleteImage = new DeleteImage(imageRepository);
const imageController = new ImageController(
    findAllImages,
    findImageById,
    createImage,
    updateImage,
    deleteImage,
);

const commentRepository = new CommentRepository();
const finfAllComments = new FindAllComments(commentRepository);
const findCommentById = new FindCommentById(commentRepository);
const createCOmment = new CreateComment(commentRepository);
const updateCOmment = new UpdateComment(commentRepository);
const deleteComment = new DeleteComment(commentRepository);
const commentController = new CommentController(
    finfAllComments,
    findCommentById,
    createCOmment,
    updateCOmment,
    deleteComment,
);

app.use('/users', userRoutes(userController));
app.use('/mushrooms', mushroomRoutes(mushroomController));
app.use('/observations', observationRoutes(observationController));
app.use('/images', imageRoutes(imageController));
app.use('/comments', commentRoutes(commentController));

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
