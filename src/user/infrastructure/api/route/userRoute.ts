import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { SqliteUserRepository } from '../../user-repository/SqliteUserRepository';
import { SendWelcomeMessageUseCase } from '../../../application/sendWelcomeMessageUseCase';
import { UserService } from '../../../application/userService';

const userRepository = new SqliteUserRepository();
const welcomeSendEmail = new SendWelcomeMessageUseCase(userRepository);
const userService = new UserService(userRepository);
const controller = new UserController(welcomeSendEmail, userService);

const userRouter = Router();

userRouter.get('/:id', controller.getUserById.bind(controller));
userRouter.post('/', controller.createUser.bind(controller));

export default userRouter;
