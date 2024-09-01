import { sign, verify } from 'hono/jwt';
import { EnvConfig } from './types';
export const hashPassword = async (password: string, saltRounds: number): Promise<string> => {
	try {
		const encoder = new TextEncoder();
		const data = encoder.encode(password + saltRounds);
		const hashBuffer = await crypto.subtle.digest('SHA-256', data);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hashedPassword = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
		return hashedPassword;
	} catch (error) {
		console.error(`Error hashing password: `, error);
		throw new Error('Error hashing password');
	}
};

export const generateJWT = async (username: string, privateKey: string): Promise<string> => {
	try {
		const token = sign({ username: username }, privateKey);
		return token;
	} catch (error) {
		console.error('Unable to sign jwt: ', error);
		throw new Error('Error signing web token');
	}
};

export const verifyJWT = async (token: string, privateKey: string): Promise<boolean> => {
	try {
		const payload = verify(token, privateKey);
		return !!payload;
	} catch (error) {
		console.error('Unable to verify JWT: ', error);
		throw new Error('Error verifying web token');
	}
};

export const getEnvs = async (c: any): Promise<EnvConfig> => {
	return {
		pvtKey: c.env.PRIVATE_KEY,
		saltRounds: c.env.SALT_ROUNDS,
	};
};
