export class User {
	constructor(
		readonly id: number,
		readonly name: string,
		readonly email: string,
		readonly password: string,
		readonly tokenAuth: string | null,
		readonly isAdmin: boolean | null,
		readonly isVerify: boolean | null,
	) {}
}
