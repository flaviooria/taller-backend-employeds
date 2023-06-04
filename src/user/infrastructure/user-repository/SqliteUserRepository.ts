// Capa de infraestructura que usa la interfaz

import prisma from '../../../../prisma/client';
import nodemailer from 'nodemailer';

import { UserInterface } from '../../domain/interfaces/userInterface';
import { User } from '../../domain/user';
import { templateEmailSender } from '../../../static/template-email';

// Importamos la conexión a la db, aquí realizamos la lógica de negocio
export class SqliteUserRepository implements UserInterface {
	private usersMemoization: Map<string, User> = new Map();

	private getUserFromMemoization(email: string): User | null {
		const userFounded = this.usersMemoization.get(email);

		if (!userFounded) return null;

		return userFounded;
	}

	private setUserToMemoization(user: User): void {
		this.usersMemoization.set(user.email!, user);
	}

	public async signUp(
		user: Omit<User, 'id' | 'isAdmin' | 'isVerify'>,
	): Promise<User> {
		const userCreated = await prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: user.password,
				tokenAuth: user.tokenAuth,
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

	public async verifyUser(email: string): Promise<User> {
		if (!email) {
			throw Error('Email not found');
		}

		const userUpdated = await prisma.user.update({
			where: {
				id: 0,
				OR: [{ email: email }],
			},
			data: {
				isVerify: true,
			},
		});

		// Set user updated
		this.setUserToMemoization(userUpdated);

		return userUpdated;
	}

	public async getUserByEmail(email: string): Promise<User | null> {
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

	public async sendEmail(
		name: string,
		email: string,
		token: string,
	): Promise<boolean | void> {
		const hostname = process.env.SMTP_HOSTNAME;
		const username = process.env.SMTP_USERNAME;
		const password = process.env.SMTP_PASSWORD;

		const transporter = nodemailer.createTransport({
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

		const template = templateEmailSender(name, token);

		// send mail with defined transport object
		const info = await transporter.sendMail({
			from: '"Test <flaviodev@xauendevs.com>',
			to: email,
			subject: 'Descubriendo el test',
			html: template,
		});

		console.log('Message sent: %s', info.response);
	}
}
