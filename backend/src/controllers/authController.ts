import clientInitialization from '../prismaClient';
import { hashPassword, generateJWT, getEnvs } from '../utils';
export const userSignUpController = async (c: any) => {
	try {
		const prisma = await clientInitialization(c);
		const User = prisma.user;
		const { pvtKey, saltRounds } = await getEnvs(c);
		const body = await c.req.json();
		const { email, password, name } = body;
		const hashedPassword = await hashPassword(password, saltRounds);
		const response = await User.create({
			data: {
				name: name,
				password: hashedPassword,
				email: email,
			},
		});
		const token = await generateJWT(email, hashedPassword, pvtKey);
		return c.json({
			token: token,
			message: 'User has been registered',
			response: response,
		});
	} catch (error) {
		console.error('Error signing up User: ', error);
		throw new Error('User SignUp Error');
	}
};

export const userSignInController = async (c: any) => {
	try {
		const prisma = await clientInitialization(c);
		const body = await c.req.json();
		const User = prisma.user;
		const { pvtKey, saltRounds } = await getEnvs(c);
		const { email, password } = body;
		const hashedPassword = await hashPassword(password, saltRounds);
		const response = await User.findUnique({
			where: {
				email: email,
				password: hashedPassword,
			},
		});

		if (response) {
			const token = await generateJWT(email, hashedPassword, pvtKey);
			return c.json({
				token: token,
				message: 'User Login',
				response: response,
			});
		} else {
			c.status(403);
			return c.json({
				message: 'User does not exist or password incorrect',
			});
		}
	} catch (error) {
		console.error('Error signing up User: ', error);
		throw new Error('User SignUp Error');
	}
};
