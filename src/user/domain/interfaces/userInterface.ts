// Creamos nuestra interfaz

import { User } from '../user';

export interface UserInterface {
	signUp(user: Omit<User, 'id'>): Promise<User>;
	signIn(user: Omit<User, 'id' | 'name' | 'isAdmin'>): Promise<User | null>;
	getUserId(id: number): Promise<User | null>;
	sendEmail(email: string): Promise<void | boolean>;
}
