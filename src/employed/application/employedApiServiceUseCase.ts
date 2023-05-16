import { Employed } from '../domain/employed';
import { EmployedInterface } from '../domain/interfaces/employedInterface';

class EmployedCreateDTO implements Omit<Employed, 'id'> {
	
	constructor(
		readonly name: string,
		readonly surname: string,
		readonly email: string,
		readonly password: string,
		readonly isAdmin: boolean
	) {	
	}
}

export class EmployedApiServiceUseCase {
	constructor(private readonly employedRepository: EmployedInterface) {}

	public async getEmployedById(id: number): Promise<Employed | null> {
		return await this.employedRepository.getEmployedById(id);
	}

	public async getAllEmployeds(): Promise<Employed[]> {
		return await this.employedRepository.getAllEmployeds();
	}

	public async createEmployed(
		name: string,
		surname: string,
		email: string,
		password: string,
		isAdmin: boolean
	): Promise<Employed> {
		const employed = new EmployedCreateDTO(name, surname, email, password, isAdmin);

		return await this.employedRepository.createEmployed(employed);
	}

	public async updateEmployed(
		id: number,
		fieldsToUpdate: Partial<Employed>,
	): Promise<Employed> {
		return await this.employedRepository.updateEmployed(id, fieldsToUpdate);
	}

	public async deleteEmployed(id: number): Promise<Employed> {
		return await this.employedRepository.deleteEmployed(id);
	}
}
