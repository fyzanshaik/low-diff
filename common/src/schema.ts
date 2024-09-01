import z from 'zod';

export const signUpInput = z.object({
	username: z.string().min(1, 'Username is required'),
	email: z.string().email('Invalid email address'),
	firstName: z.string().min(1, 'First Name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	password: z.string().min(1, 'Password is required'),
});

export const signInInput = z.object({
	emailOrUsername: z.string().min(1, 'Email or Username is required'),
	password: z.string().min(1, 'Password is required'),
});

export const blogSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	content: z.string().min(1, 'Content is required'),
});

export const updateBlogSchema = z.object({
	title: z.string(),
	content: z.string(),
	id: z.number(),
});
