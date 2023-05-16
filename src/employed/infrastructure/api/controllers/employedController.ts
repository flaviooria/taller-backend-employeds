import { Request, Response } from 'express';
import { EmployedApiServiceUseCase } from '../../../application/employedApiServiceUseCase';

export class EmployedController {
	constructor(private readonly employedService: EmployedApiServiceUseCase) {}

	public async getEmployeds(_req: Request, res: Response) {
		try {
			const employeds = await this.employedService.getAllEmployeds();
			res.status(200).send(employeds);
		} catch (error: any) {
			res
				.status(error?.status || 400)
				.send({ message: error?.message || 'Internal server error' });
		}
	}

	public async getEmployedById(req: Request, res: Response) {
		const {
			params: { id },
		} = req;

		try {
			const employedFounded = await this.employedService.getEmployedById(
				Number(id),
			);

			if (!employedFounded) {
				res.status(404).send({ message: 'Employed not found' });
			}

			res.status(200).send(employedFounded);
		} catch (error: any) {
			res
				.status(error?.status || 400)
				.send({ message: error?.message || 'Internal server error' });
		}
	}

	public async createEmployed(req: Request, res: Response) {
		const {
			body: { name, surname, email, password, isAdmin },
		} = req;

		try {
			if (
				!name ||
				name === '' ||
				!surname ||
				surname === '' ||
				!email ||
				email === '' ||
				!password ||
				password === ''
			) {
				res.status(400).send({ message: 'Fields not accepted' });
			}

			const employedCreated = await this.employedService.createEmployed(
				name,
				surname,
				email,
				password,
				isAdmin
			);

			res.status(201).send(employedCreated);
		} catch (error: any) {
			res
				.status(error?.status || 400)
				.send({ message: error?.message || 'Internal server error' });
		}
	}

	public async updateEmployed(req: Request, res: Response) {
		const {
			params: { id },
			body: { name, surname, email, password },
		} = req;

		try {
			if (
				!id ||
				id === '' ||
				!name ||
				name === '' ||
				!surname ||
				surname === '' ||
				!email ||
				email === '' ||
				!password ||
				password === ''
			) {
				res.status(400).send({ message: 'Fields not accepted' });
			}

			const employedFounded = await this.employedService.getEmployedById(
				Number(id),
			);

			if (!employedFounded) {
				res.status(404).send({ message: 'Employed not found to update' });
			}

			const employedUpdated = await this.employedService.updateEmployed(
				Number(id),
				req.body,
			);

			res.status(200).send(employedUpdated);
		} catch (error: any) {
			res
				.status(error?.status || 400)
				.send({ message: error?.message || 'Internal server error' });
		}
	}

	public async deleteEmployed(req: Request, res: Response) {
		const {
			params: { id },
		} = req;

		try {
			const employedDeleted = await this.employedService.deleteEmployed(
				Number(id),
			);

			res.status(200).send(employedDeleted);
		} catch (error: any) {
			res
				.status(error?.status || 400)
				.send({ message: error?.message || 'Internal server error' });
		}
	}
}
