import { JwtPayload } from 'jsonwebtoken';

import { JwtInterface } from '../domain/interface/jwtInterface';

export class AuthJwtUseCase {
	constructor(private readonly jwtRepository: JwtInterface) {}

	generateToken(email: string, minutesToExpiration: number): string {
		return this.jwtRepository.generateToken(email, minutesToExpiration);
	}

	verifySignature(token: string): string | JwtPayload | undefined {
		return this.jwtRepository.verifySignatureToken(token);
	}
}
