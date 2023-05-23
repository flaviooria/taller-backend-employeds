import { UserInterface } from '../domain/interfaces/userInterface';
import { User } from '../domain/user';

class UserCreateDTO implements Omit<User, 'id' | 'tokenAuth'> {
	constructor(
		readonly name: string,
		readonly email: string,
		readonly password: string,
		readonly isAdmin: boolean,
	) {}
}

export class UserApiServiceUseCase {
	constructor(private readonly userRepository: UserInterface) {}

	public async signUp(
		name: string,
		email: string,
		password: string,
		isAdmin: boolean,
	): Promise<User> {
		const user = new UserCreateDTO(name, email, password, isAdmin);
		return await this.userRepository.signUp(user);
	}

	public async signIn(email: string): Promise<User | null> {
		return await this.userRepository.signIn(email);
	}

	public async getUserByEmail(email: string): Promise<User | null> {
		return await this.userRepository.getUserByEmail(email);
	}

	public async getUserByToken(token: string): Promise<User | null> {
		return await this.userRepository.getUserByToken(token);
	}

	public async updateUserToken(id: number, token: string): Promise<User> {
		return await this.userRepository.updateUserToken(id, token);
	}
}
