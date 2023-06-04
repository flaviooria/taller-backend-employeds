import { JobPositions } from '../../../types';

export class Employed {
	constructor(
		readonly id: number,
		readonly name: string,
		readonly surname: string,
		readonly email: string,
		readonly password: string,
		readonly jobPosition: string | JobPositions,
	) {}
}
