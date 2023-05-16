import { Employed } from '../domain/employed';
import { EmployedInterface } from '../domain/interfaces/employedInterface';

class UserCreateDTO implements Omit<Employed, 'id' | 'isAdmin'> {
	constructor(
		readonly name: string,
		readonly surname: string,
		readonly email: string,
		readonly password: string,
	) {}
}

export class EmployedApiServiceUseCase {
	constructor(private readonly employedInterface: EmployedInterface) {}

	async getEmployedById(id: number): Promise<Employed | null> {
		return await this.employedInterface.getEmployedById(id);
	}

	async getAllEmployeds(): Promise<Employed[]> {
		return await this.employedInterface.getAllEmployeds();
	}

	async createEmployed(
		name: string,
		surname: string,
		email: string,
		password: string,
	): Promise<Employed> {
		const employed = new UserCreateDTO(name, surname, email, password);

		return await this.employedInterface.createEmployed(employed);
	}

	async updateEmployed(
		id: number,
		fieldsToUpdate: Partial<Employed>,
	): Promise<Employed> {
		return await this.employedInterface.updateEmployed(id, fieldsToUpdate);
	}

	async deleteEmployed(id: number): Promise<Employed> {
		return await this.employedInterface.deleteEmployed(id);
	}
}
