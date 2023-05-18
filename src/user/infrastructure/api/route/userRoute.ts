import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { SqliteUserRepository } from '../../user-repository/SqliteUserRepository';
import { SendWelcomeMessageUseCase } from '../../../application/sendWelcomeMessageUseCase';
import { UserApiServiceUseCase } from '../../../application/userApiServiceUseCase';

const userRepository = new SqliteUserRepository();
const welcomeSendEmail = new SendWelcomeMessageUseCase(userRepository);
const userService = new UserApiServiceUseCase(userRepository);
const controller = new UserController(welcomeSendEmail, userService);

const userRouter = Router();

userRouter.get('/:id', controller.getUserById.bind(controller));
userRouter.post('/register', controller.signUp.bind(controller));
userRouter.post('/login', controller.signIn.bind(controller));

export default userRouter;
