import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { User } from '../../user/domain/user';
import { Employed } from '../../employed/domain/employed';

type ValidTypesToAuth =
	| Pick<User, 'id' | 'name'>
	| Pick<Employed, 'id' | 'name'>;

export class JwtRepository {
	public async generateToken<T extends ValidTypesToAuth>(
		object: T,
	): Promise<string> {
		const { id: sub, username } = { id: object.id, username: object.name };

		const token = jwt.sign(
			{
				sub,
				username,
			},
			'SECRET',
			{ expiresIn: '1h' },
		);

		return token;
	}
}
