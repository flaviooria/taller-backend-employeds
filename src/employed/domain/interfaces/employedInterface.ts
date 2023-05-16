import { Employed } from '../employed';

export interface EmployedInterface {
	getAllEmployeds(): Promise<Employed[]>;
	getEmployedById(id: number): Promise<Employed | null>;
	createEmployed(employed: Omit<Employed, 'id'>): Promise<Employed>;
	updateEmployed(
		id: number,
		fieldsToUpdate: Partial<Employed>,
	): Promise<Employed>;
	deleteEmployed(id: number): Promise<Employed>;
}
