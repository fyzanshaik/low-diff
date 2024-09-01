/**
 * Take the jwt from header
 * verify if its a valid jwt
 * add the user id  or name obtained from it and attach to the user.id object in the header
 * go to the required route
 */

import { Next } from 'hono';
import { verify } from 'hono/jwt';
import { getEnvs } from '../utils';
export const handleMiddleware = async (c: any, next: Next) => {
	const { pvtKey } = await getEnvs(c);
	const authHeader: string = c.req.header('Authorization') || '';
	try {
		const token = authHeader && authHeader.split(' ')[1];
		if (!token) {
			return c.status(401).json({ error: 'No token provided' });
		}
		const user = await verify(authHeader, pvtKey);
		if (user) {
			c.set('userId', user.username);
			await next();
		} else {
			c.status(403);
			return c.json({
				message: 'You are not logged in',
			});
		}
	} catch (error) {
		c.status(403);
		return c.json({
			message: 'You are not logged in',
		});
	}
};
