import { UserInterface } from '../domain/interfaces/userInterface';

// Caso de uso
export class SendWelcomeMessageUseCase {
	constructor(private readonly userRepositoryInterface: UserInterface) {}

	async sendEmail(email: string) {
		await this.userRepositoryInterface.sendEmail(email);
	}
}
