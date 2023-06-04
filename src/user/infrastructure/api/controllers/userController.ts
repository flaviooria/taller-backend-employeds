import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
// import { v4 as uuid } from 'uuid';
// import jwt, { JwtPayload } from 'jsonwebtoken';

import { SendWelcomeMessageUseCase } from '../../../application/sendWelcomeMessageUseCase';
import { UserApiServiceUseCase } from '../../../application/userApiServiceUseCase';
import { AuthJwtUseCase } from '../../../../auth/application/authJwtUseCase';
import { JwtPayload } from 'jsonwebtoken';

export class UserController {
	constructor(
		private readonly welcomeSendEmail: SendWelcomeMessageUseCase,
		private readonly userService: UserApiServiceUseCase,
		private readonly authJwtService: AuthJwtUseCase,
	) {}

	public async signIn(req: Request, res: Response) {
		try {
			const {
				body: { email, password },
			} = req;

			if (!email || !password) {
				res.status(400).send({ message: 'Fields not valid' });
			}

			const user = await this.userService.signIn(email);

			if (!user) {
				res.status(404).send({ message: 'User not found' });
				return;
			}

			const isMatchPassword = bcrypt.compareSync(password, user?.password!);

			if (!isMatchPassword) {
				res.status(400).send({ message: 'Password invalid' });
				return;
			}

			// Generate token
			const token = this.authJwtService.generateToken(user.email, 30);

			const { id, name, email: emailUser, isAdmin, isVerify } = { ...user };

			res
				.status(200)
				.send({ id, name, email: emailUser, token, isAdmin, verify: isVerify });
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ message: error?.message || 'Internal server error' });
		}
	}

	public async signUp(req: Request, res: Response) {
		try {
			const {
				body: { name, email, password },
			} = req;

			if (!name || !email || !password) {
				res.status(400).send({ message: 'Fields not valid' });
			}

			const saltRound = 10;
			const salt = bcrypt.genSaltSync(saltRound);
			const hashPassword = bcrypt.hashSync(password, salt);

			const token = this.authJwtService.generateToken(email, 30);

			const user = await this.userService.signUp(
				name,
				email,
				hashPassword,
				token,
			);

			if (user.email.includes('@gmail.com')) {
				await this.welcomeSendEmail.sendEmail(user.name, user.email, token);
			}

			res.status(201).send(user);
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ message: error?.message || 'Internal server error' });
		}
	}

	public async getUserByTokenJWT(req: Request, res: Response) {
		try {
			const {
				headers: { authorization },
			} = req;

			const token = authorization?.replace('Bearer', '').trim();

			const payload = this.authJwtService.verifySignature(token!) as JwtPayload;

			const userFounded = await this.userService.getUserByEmail(payload.sub!);

			if (!userFounded) {
				res.status(404).send({ message: 'User not found' });
				return;
			}

			const {
				id,
				name,
				email: emailUser,
				isAdmin,
				tokenAuth,
			} = { ...userFounded };

			res.status(200).send({ id, name, email: emailUser, isAdmin, tokenAuth });
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ message: error?.message || 'Internal server error' });
		}
	}

	public async verifyUserMember(req: Request, res: Response) {
		try {
			const {
				params: { token },
			} = req;

			if (!token) {
				res.status(400).send({ message: 'Token not found' });
			}

			const payload = this.authJwtService.verifySignature(token!) as JwtPayload;

			const emailUser = payload.sub;

			// Update isVerify of user
			const userUpdated = await this.userService.updateVerifyUser(
				<string>emailUser,
			);

			if (!userUpdated) {
				res.status(400).send({ message: 'User verify account incorrect' });
			}

			res.status(200).send({ message: 'User verify account correct' });
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ message: error?.message || 'Internal server error' });
		}
	}
}
