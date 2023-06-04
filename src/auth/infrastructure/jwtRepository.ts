import jwt, { JwtPayload, JsonWebTokenError } from 'jsonwebtoken';

import { JwtInterface } from '../domain/interface/jwtInterface';

export class JwtRepository implements JwtInterface {
	protected addMinutes(date: Date, minutes: number): number {
		date.setMinutes(date.getMinutes() + minutes);

		return date.getTime();
	}

	generateToken(email: string, minutesToExpiration: number): string {
		try {
			const payload: JwtPayload = {
				sub: email,
				exp: this.addMinutes(new Date(), minutesToExpiration),
			};

			const token = jwt.sign(
				payload,
				process.env.SECRET || '18cb69d88a5d2522ab29b9da485c2292',
				{
					algorithm: 'HS256',
				},
			);

			return token;
		} catch (error: any) {
			throw new JsonWebTokenError(error?.message);
		}
	}

	verifySignatureToken(token: string): string | JwtPayload | undefined {
		try {
			const subject = jwt.verify(
				token,
				process.env.SECRET || '18cb69d88a5d2522ab29b9da485c2292',
				{
					algorithms: ['HS256'],
				},
			);

			if (subject) return subject;
			return;
		} catch (error: any) {
			throw new JsonWebTokenError(error?.message);
		}
	}
}
