import { JwtPayload } from 'jsonwebtoken';

export interface JwtInterface {
	/**
	 *	method to generate token using jwt
	 * @param email Customers to receive the email
	 * @param minutesToExpiration minutes to elapse before expirate token
	 * @returns token
	 */
	generateToken(email: string, minutesToExpiration: number): string;
	/**
	 *	method to get payload
	 * @param token token get from headers authorization
	 * @returns payload from jwt
	 */
	verifySignatureToken(token: string): string | JwtPayload | undefined;
}
