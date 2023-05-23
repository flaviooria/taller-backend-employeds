import { JwtPayload } from 'jsonwebtoken';
import { Employed } from '../../employed/domain/employed';
import { User } from '../../user/domain/user';
import { JwtInterface } from '../domain/interface/jwtInterface';

export class AuthJwtUseCase {
	constructor(private readonly jwtRepository: JwtInterface) {}

	generateToken(client: User | Employed, minutesToExpiration: number): string {
		return this.jwtRepository.generateToken(client, minutesToExpiration);
	}

	verifySignature(token: string): string | JwtPayload | undefined {
		return this.jwtRepository.verifySignatureToken(token);
	}
}
