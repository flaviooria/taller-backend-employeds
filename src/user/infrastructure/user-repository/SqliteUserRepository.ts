// Capa de infraestructura que usa la interfaz

import prisma from '../../../../prisma/client';
import nodemailer from 'nodemailer';

import { UserInterface } from '../../domain/interfaces/userInterface';
import { User } from '../../domain/user';

// class UserSignInResponseDTO implements Exclude<User,'password'> {
// 	constructor() {}
// }

// Importamos la conexión a la db, aquí realizamos la lógica de negocio
export class SqliteUserRepository implements UserInterface {
	private usersMemoization: Map<string, User> = new Map();

	public async signUp(user: Omit<User, 'id' | 'tokenAuth'>): Promise<User> {
		const userCreated = await prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: user.password,
				isAdmin: user.isAdmin,
				tokenAuth: null,
			},
		});

		return userCreated;
	}

	public async signIn(email: string): Promise<User | null> {
		const userInMemory = this.getUserFromMemoization(email);

		if (userInMemory) return userInMemory;
		else {
			const userFounded = await prisma.user.findFirst({
				where: {
					email,
				},
			});

			if (!userFounded) return null;
			else {
				this.setUserToMemoization(userFounded!);
				return userFounded;
			}
		}
	}

	public async updateUserToken(id: number, token: string): Promise<User> {
		if (!id) {
			throw Error('Id not found');
		}

		if (!token) {
			throw Error('Token not found');
		}

		const userUpdated = await prisma.user.update({
			where: {
				id: id,
			},
			data: {
				tokenAuth: token,
			},
		});

		// Set user updated
		this.setUserToMemoization(userUpdated);

		return userUpdated;
	}

	private getUserFromMemoization(email: string): User | null {
		const userFounded = this.usersMemoization.get(email);

		if (!userFounded) return null;

		return userFounded;
	}

	private setUserToMemoization(user: User): void {
		this.usersMemoization.set(user.email!, user);
	}

	public async sendEmail(name: string, email: string): Promise<boolean | void> {
		const hostname = process.env.SMTP_HOSTNAME;
		const username = process.env.SMTP_USERNAME;
		const password = process.env.SMTP_PASSWORD;

		let transporter = nodemailer.createTransport({
			host: hostname,
			port: 587,
			secure: false,
			requireTLS: true,
			auth: {
				user: username,
				pass: password,
			},
			logger: true,
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: '"Taller Xauen Devs" <flaviodev@xauendevs.com>',
			to: email,
			subject: 'Descubriendo Sveltekit',
			text: `Hola ${name} bienvenido a la charla, espero que te guste!!!`,
			html: `<strong>Hola ${name} bienvenido a la charla, espero que te guste!!!</strong>`,
		});

		console.log('Message sent: %s', info.response);
	}

	async getUserByToken(token: string): Promise<User | null> {
		if (!token) {
			throw new Error('Token field not found');
		}

		const userFoundedFromDb = await prisma.user.findFirst({
			where: {
				tokenAuth: token,
			},
		});

		return userFoundedFromDb;
	}
}
