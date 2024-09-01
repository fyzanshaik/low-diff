import clientInitialization from '../prismaClient';
import { hashPassword, generateJWT, getEnvs } from '../utils';
export const userSignUpController = async (c: any) => {
	try {
		const prisma = await clientInitialization(c);
		const User = prisma.user;
		const { pvtKey, saltRounds } = await getEnvs(c);
		const body = await c.req.json();
		const { email, password, username, firstName, lastName } = body;
		const hashedPassword = await hashPassword(password, saltRounds);
		const response = await User.create({
			data: {
				username: username,
				name: firstName + ' ' + lastName,
				password: hashedPassword,
				email: email,
			},
		});
		const token = await generateJWT(username, pvtKey);
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
		const { emailOrUsername, password } = body;

		const hashedPassword = await hashPassword(password, saltRounds);

		const response = await User.findFirst({
			where: {
				AND: [
					{
						OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
					},
					{ password: hashedPassword },
				],
			},
		});

		if (response) {
			const token = await generateJWT(response.email, pvtKey);
			return c.json({
				token: token,
				message: 'User Login Successful',
				response: response,
			});
		} else {
			c.status(403);
			return c.json({
				message: 'User does not exist or password incorrect',
			});
		}
	} catch (error) {
		console.error('Error signing in User: ', error);
		return c.status(500).json({ error: 'User SignIn Error' });
	}
};
