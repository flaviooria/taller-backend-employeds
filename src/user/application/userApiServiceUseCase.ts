import { UserInterface } from '../domain/interfaces/userInterface';
import { User } from '../domain/user';

export class UserApiServiceUseCase {
	constructor(private readonly userRepository: UserInterface) {}

	async createUser(name: string, email: string): Promise<User> {
		const user = new User(null, name, email);
		return await this.userRepository.createUser(user);
	}

	async getUserById(id: number): Promise<User | null> {
		return await this.userRepository.getUserId(id);
	}
}
