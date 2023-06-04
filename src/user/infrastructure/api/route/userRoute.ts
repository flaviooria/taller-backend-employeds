import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { SqliteUserRepository } from '../../user-repository/SqliteUserRepository';
import { SendWelcomeMessageUseCase } from '../../../application/sendWelcomeMessageUseCase';
import { UserApiServiceUseCase } from '../../../application/userApiServiceUseCase';
import { AuthJwtUseCase } from '../../../../auth/application/authJwtUseCase';
import { JwtRepository } from '../../../../auth/infrastructure/jwtRepository';

// Repositories
const userRepository = new SqliteUserRepository();
const authRepositoy = new JwtRepository();

// Dependencies
const authJwtService = new AuthJwtUseCase(authRepositoy);
const welcomeSendEmail = new SendWelcomeMessageUseCase(userRepository);
const userService = new UserApiServiceUseCase(userRepository);

// Application Controller API
const controller = new UserController(
	welcomeSendEmail,
	userService,
	authJwtService,
);

const userRouter = Router();

userRouter.get('/me', controller.getUserByTokenJWT.bind(controller));
userRouter.get('/:token', controller.verifyUserMember.bind(controller));
userRouter.post('/register', controller.signUp.bind(controller));
userRouter.post('/login', controller.signIn.bind(controller));

export default userRouter;
