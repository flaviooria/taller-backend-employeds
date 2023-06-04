import { UserInterface } from '../domain/interfaces/userInterface';
import { User } from '../domain/user';

class UserCreateDTO implements Omit<User, 'id' | 'isAdmin' | 'isVerify'> {
	constructor(
		readonly name: string,
		readonly email: string,
		readonly password: string,
		readonly tokenAuth: string,
	) {}
}

export class UserApiServiceUseCase {
	constructor(private readonly userRepository: UserInterface) {}

	public async signUp(
		name: string,
		email: string,
		password: string,
		token: string,
	): Promise<User> {
		const user = new UserCreateDTO(name, email, password, token);
		return await this.userRepository.signUp(user);
	}

	public async signIn(email: string): Promise<User | null> {
		return await this.userRepository.signIn(email);
	}

	public async getUserByEmail(email: string): Promise<User | null> {
		return await this.userRepository.getUserByEmail(email);
	}

	public async updateVerifyUser(email: string): Promise<User> {
		return await this.userRepository.verifyUser(email);
	}
}
