import { UserInterface } from '../domain/interfaces/userInterface';

// Caso de uso
export class SendWelcomeMessageUseCase {
	constructor(private readonly userRepository: UserInterface) {}

	async sendEmail(name: string, email: string, token: string) {
		await this.userRepository.sendEmail(name, email, token);
	}
}
