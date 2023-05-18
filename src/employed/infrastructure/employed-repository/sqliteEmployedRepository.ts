import { Employed } from '../../domain/employed';
import { EmployedInterface } from '../../domain/interfaces/employedInterface';
import prisma from '../../../../prisma/client';

export class SqliteEmployedRepository implements EmployedInterface {
	private employedsMemoization: Map<number, Employed> = new Map();

	private getEmployedFromMemoization(id: number): Employed | null {
		const employedFounded = this.employedsMemoization.get(id);

		if (!employedFounded) return null;

		return employedFounded;
	}

	private setEmployedToMemoization(employed: Employed): void {
		this.employedsMemoization.set(employed.id, employed);
	}

	public async getAllEmployeds(): Promise<Employed[]> {
		return await prisma.employed.findMany();
	}

	public async getEmployedById(id: number): Promise<Employed | null> {
		if (!id) {
			throw new Error('Id field not found');
		}

		const employedInMemory = this.getEmployedFromMemoization(id);

		if (employedInMemory) return employedInMemory;
		else {
			const employedInDb = await prisma.employed.findUnique({ where: { id } });

			if (!employedInDb) return null;

			this.setEmployedToMemoization(employedInDb);
			return employedInDb;
		}
	}

	public async createEmployed(
		employed: Omit<Employed, 'id'>,
	): Promise<Employed> {
		const { name, surname, email, password, isAdmin } = employed;

		return await prisma.employed.create({
			data: {
				name,
				surname,
				email,
				password,
				isAdmin,
			},
		});
	}

	public async updateEmployed(
		id: number,
		fieldsToUpdate: Partial<Employed>,
	): Promise<Employed> {
		return await prisma.employed.update({
			data: { ...fieldsToUpdate },
			where: { id },
		});
	}

	public async deleteEmployed(id: number): Promise<Employed> {
		if (!id) {
			throw new Error('Id field not found');
		}

		return await prisma.employed.delete({ where: { id } });
	}
}
