// Creamos nuestra interfaz

import { User } from '../user';

export interface UserInterface {
	createUser(user: User): Promise<User>;
	getUserId(id: number): Promise<User | null>;
	sendEmail(email: string): Promise<void | boolean>;
}
