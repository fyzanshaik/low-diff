// types.d.ts
import { blogSchema, updateBlogSchema, signInInput, signUpInput } from './schema';

export type BlogSchema = z.infer<typeof blogSchema>;
export type UpdateBlogSchema = z.infer<typeof updateBlogSchema>;
export type SignUp = z.infer<typeof signUpInput>;
export type SignIn = z.infer<typeof signInInput>;

export interface HonoBindings {
	DATABASE_URL: string;
	SALT_ROUNDS: number;
	PRIVATE_KEY: string;
}

export interface HonoVariables {
	userId: string;
}

export interface EnvConfig {
	pvtKey: string;
	saltRounds: number;
}
