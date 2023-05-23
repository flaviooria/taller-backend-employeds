// Creamos nuestra interfaz

import { User } from '../user';

export interface UserInterface {
	signUp(user: Omit<User, 'id' | 'tokenAuth'>): Promise<User>;
	signIn(email: string): Promise<User | null>;
	getUserByToken(token: string): Promise<User | null>;
	getUserByEmail(email: string): Promise<User | null>;
	updateUserToken(id: number, token: string): Promise<User>;
	sendEmail(name: string, email: string): Promise<void | boolean>;
}
