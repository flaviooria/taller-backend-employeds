import { UserInterface } from '../domain/interfaces/userInterface';
import { User } from '../domain/user';

class UserCreateDTO implements Omit<User, 'id'> {
	constructor(
		readonly name: string,
		readonly email: string,
		readonly password: string,
		readonly isAdmin: boolean,
	) {}
}

class UserSingInDTO implements Omit<User, 'id' | 'name' | 'isAdmin'> {
	constructor(readonly email: string, readonly password: string) {}
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

	public async signIn(email: string, password: string): Promise<User | null> {
		const user = new UserSingInDTO(email, password);
		return await this.userRepository.signIn(user);
	}

	public async getUserById(id: number): Promise<User | null> {
		return await this.userRepository.getUserId(id);
	}
}
