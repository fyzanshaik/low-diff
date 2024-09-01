import clientInitialization from '../prismaClient';
import { hashPassword, generateJWT, getEnvs } from '../utils';
import { signInInput, signUpInput } from '../types/schema';
export const userSignUpController = async (c: any) => {
	try {
		const prisma = await clientInitialization(c);
		const User = prisma.user;
		const { pvtKey, saltRounds } = await getEnvs(c);
		const body = await c.req.json();

		const { success, data, error } = signUpInput.safeParse(body);

		if (!success) {
			return c.status(400).json({ errors: error.errors });
		}

		const { email, password, username, firstName, lastName } = data;
		const hashedPassword = await hashPassword(password, saltRounds);
		const response = await User.create({
			data: {
				username: username,
				name: `${firstName} ${lastName}`,
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
		return c.status(500).json({ message: 'User SignUp Error' });
	}
};

export const userSignInController = async (c: any) => {
	try {
		const prisma = await clientInitialization(c);
		const body = await c.req.json();
		const User = prisma.user;
		const { pvtKey, saltRounds } = await getEnvs(c);
		const { success, data, error } = signInInput.safeParse(body);
		if (!success) {
			return c.status(400).json({ errors: error.errors });
		}

		const { emailOrUsername, password } = data;

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
