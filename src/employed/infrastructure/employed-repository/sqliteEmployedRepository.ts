import { Employed } from '../../domain/employed';
import { EmployedInterface } from '../../domain/interfaces/employedInterface';
import prisma from '../../../../prisma/client';

export class SqliteEmployedRepository implements EmployedInterface {
	async getAllEmployeds(): Promise<Employed[]> {
		return await prisma.employed.findMany();
	}

	async getEmployedById(id: number): Promise<Employed | null> {
		if (!id) {
			throw new Error('Id field not found');
		}

		return await prisma.employed.findUnique({ where: { id } });
	}

	async createEmployed(employed: Employed): Promise<Employed> {
		throw new Error('Method not implemented.');
	}
	async updateEmployed(
		id: number,
		fieldsToUpdate: Partial<Employed>,
	): Promise<Employed> {
		throw new Error('Method not implemented.');
	}
	async deleteEmployed(id: number): Promise<Employed> {
		throw new Error('Method not implemented.');
	}
}
