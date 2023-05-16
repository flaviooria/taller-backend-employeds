export class Employed {
	constructor(
		readonly id: number | null,
		readonly name: string,
		readonly surname: string,
		readonly email: string,
		readonly password: string,
		readonly isAdmin: boolean = false,
	) {}
}
