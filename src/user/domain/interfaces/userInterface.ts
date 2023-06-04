// Creamos nuestra interfaz

import { User } from '../user';

export interface UserInterface {
	signUp(user: Omit<User, 'id' | 'isAdmin' | 'isVerify'>): Promise<User>;
	signIn(email: string): Promise<User | null>;
	verifyUser(email: string): Promise<User>;
	getUserByEmail(email: string): Promise<User | null>;
	sendEmail(
		name: string,
		email: string,
		token: string,
	): Promise<void | boolean>;
}
