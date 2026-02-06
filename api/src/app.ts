import { env } from './config/env.js';
import express from 'express';
import cors from 'cors';
import { errorHandler } from './interfaces/middlewares/error.middleware.js';
import { UserRepository } from './infrastructure/user.repository.js';
import { CreateUser } from './usecases/user/createUser.js';
import { UserController } from './interfaces/controllers/user.controller.js';
import { FindAllUsers } from './usecases/user/findAllUsers.js';
import userRoutes from './interfaces/routes/user.routes.js';
import { FindUserById } from './usecases/user/findUserById.js';
import { UpdateUser } from './usecases/user/updateUser.js';
import { DeleteUser } from './usecases/user/deleteUser.js';
import { FindUserByEmail } from './usecases/user/findUserByEmail.js';
import { MushroomRepository } from './infrastructure/mushroom.repository.js';
import { FindAllMushrooms } from './usecases/mushroom/findAllMushrooms.js';
import { FindMushroomById } from './usecases/mushroom/findMushroomById.js';
import { CreateMushroom } from './usecases/mushroom/createMushroom.js';
import { UpdateMushroom } from './usecases/mushroom/updateMushroom.js';
import { DeleteMushroom } from './usecases/mushroom/deleteMushroom.js';
import { MushroomController } from './interfaces/controllers/mushroom.controller.js';
import { ObservationRepository } from './infrastructure/observation.repository.js';
import { FindAllObservations } from './usecases/observation/findAllObservations.js';
import { FindObservationById } from './usecases/observation/findObservationById.js';
import { CreateObservation } from './usecases/observation/createObservation.js';
import { UpdateObservation } from './usecases/observation/updateObservation.js';
import { DeleteObservation } from './usecases/observation/deleteObservation.js';
import { ObservationController } from './interfaces/controllers/observation.controller.js';
import { ImageRepository } from './infrastructure/image.repository.js';
import { FindAllImages } from './usecases/image/findAllImages.js';
import { FindImageById } from './usecases/image/findImageById.js';
import { CreateImage } from './usecases/image/createImage.js';
import { UpdateImage } from './usecases/image/updateImage.js';
import { ImageController } from './interfaces/controllers/image.controller.js';
import { DeleteImage } from './usecases/image/deletImage.js';
import { CommentRepository } from './infrastructure/comment.repository.js';
import { FindAllComments } from './usecases/comment/findAllComments.js';
import { FindCommentById } from './usecases/comment/findCommentById.js';
import { CreateComment } from './usecases/comment/createComment.js';
import { UpdateComment } from './usecases/comment/updateComment.js';
import { DeleteComment } from './usecases/comment/deleteComment.js';
import { CommentController } from './interfaces/controllers/comment.controller.js';
import mushroomRoutes from './interfaces/routes/mushroom.routes.js';
import observationRoutes from './interfaces/routes/observation.routes.js';
import imageRoutes from './interfaces/routes/image.routes.js';
import commentRoutes from './interfaces/routes/comment.routes.js';
import { AuthController } from './interfaces/controllers/auth.controller.js';
import { LoginUser } from './usecases/auth/loginUser.js';
import authRoutes from './interfaces/routes/auth.routes.js';
import { AuthService } from './infrastructure/services/AuthService.js';
import cookieParser from 'cookie-parser';
import { RefreshAccessToken } from './usecases/auth/refreshAccessToken.js';

const app = express();

app.use(cookieParser());

app.use(
    cors({
        origin: env.FRONT_URL,
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

const authService = new AuthService();
const loginUserUseCase = new LoginUser(userRepository, authService);
const refreshAccessToken = new RefreshAccessToken(userRepository, authService);
const authController = new AuthController(loginUserUseCase, refreshAccessToken);

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

app.use('/users', userRoutes(userController, authService, findUserByIdUseCase));
app.use('/auth', authRoutes(authController));
app.use('/mushrooms', mushroomRoutes(mushroomController, authService, findUserByIdUseCase));
app.use(
    '/observations',
    observationRoutes(observationController, authService, findUserByIdUseCase),
);
app.use('/images', imageRoutes(imageController, authService, findUserByIdUseCase));
app.use('/comments', commentRoutes(commentController, authService, findUserByIdUseCase));

app.use(errorHandler);

export default app;
