import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { SendWelcomeMessageUseCase } from '../../../application/sendWelcomeMessageUseCase';
import { UserApiServiceUseCase } from '../../../application/userApiServiceUseCase';

export class UserController {
	constructor(
		private readonly welcomeSendEmail: SendWelcomeMessageUseCase,
		private readonly userService: UserApiServiceUseCase,
	) {}

	public async signIn(req: Request, res: Response) {
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
		const token = uuid();

		const userWithTokenUpdated = await this.userService.updateUserToken(
			user?.id!,
			token,
		);

		const {
			id,
			name,
			email: emailUser,
			isAdmin,
			tokenAuth,
		} = { ...userWithTokenUpdated };

		res
			.status(200)
			.send({ id, name, email: emailUser, token: tokenAuth, isAdmin });
	}

	public async signUp(req: Request, res: Response) {
		const {
			body: { name, email, password },
		} = req;

		if (!name || !email || !password) {
			res.status(400).send({ message: 'Fields not valid' });
		}

		let isAdmin = false;

		if (email.includes('@xauendevs.com')) {
			isAdmin = true;
		}

		const saltRound = 10;
		const salt = bcrypt.genSaltSync(saltRound);
		const hashPassword = bcrypt.hashSync(password, salt);

		const user = await this.userService.signUp(
			name,
			email,
			hashPassword,
			isAdmin,
		);

		if (user.email.includes('@gmail.com')) {
			await this.welcomeSendEmail.sendEmail(user.name, user.email);
		}
		res.status(201).send(user);
	}

	public async getUserByToken(req: Request, res: Response) {
		const {
			params: { token },
		} = req;

		try {
			const userFounded = await this.userService.getUserByToken(token);

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
}
