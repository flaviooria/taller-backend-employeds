import { JwtPayload } from 'jsonwebtoken';
import { ValidTypesToAuth } from '../../../../types';

export interface JwtInterface {
	/**
	 *	method to generate token using jwt
	 * @param object Customers to receive the email, they can be user or employees.
	 * @param minutesToExpiration minutes to elapse before expirate token
	 * @returns token
	 */
	generateToken(object: ValidTypesToAuth, minutesToExpiration: number): string;
	/**
	 *	method to get payload
	 * @param token token get from headers authorization
	 * @returns payload from jwt
	 */
	verifySignatureToken(token: string): string | JwtPayload | undefined;
}
