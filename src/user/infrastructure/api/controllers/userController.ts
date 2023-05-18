import { Request, Response } from 'express';
import { SendWelcomeMessageUseCase } from '../../../application/sendWelcomeMessageUseCase';
import { UserApiServiceUseCase } from '../../../application/userApiServiceUseCase';

export class UserController {
	constructor(
		private readonly welcomeSendEmail: SendWelcomeMessageUseCase,
		private readonly userService: UserApiServiceUseCase,
	) {}

	public async sendEmail(req: Request, res: Response) {
		const {
			params: { id },
		} = req;

		const userFounded = await this.userService.getUserById(Number(id));

		if (!userFounded) {
			res.status(404).send({ message: 'User not found' });
		}

		await this.welcomeSendEmail.sendEmail(userFounded?.email!);
		res.status(200).send();
	}

	public async signIn(req: Request, res: Response) {
		const {
			body: { email, password },
		} = req;

		if (!email || !password) {
			res.status(400).send({ message: 'Fields not valid' });
		}

		const user = await this.userService.signIn(email, password);

		if (!user) {
			res.status(404).send({ message: 'User not found' });
		}

		res.status(200).send(user);
	}

	public async signUp(req: Request, res: Response) {
		const {
			body: { name, email, password },
		} = req;

		if (!name || !email) {
			res.status(400).send({ message: 'Fields not valid' });
		}

		const user = await this.userService.signUp(name, email, password);

		res.status(201).send(user);
	}

	public async getUserById(req: Request, res: Response) {
		const {
			params: { id },
		} = req;

		try {
			const userFounded = await this.userService.getUserById(Number(id));

			if (!userFounded) {
				res.status(404).send({ message: 'User not found' });
			}

			res.status(200).send(userFounded);
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ message: error?.message || 'Internal server error' });
		}
	}
}
