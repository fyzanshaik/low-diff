import { blogSchema, updateBlogSchema, signInInput, signUpInput } from './schema';

export type BlogSchema = z.infer<typeof blogSchema>;
export type UpdateBlogSchema = z.infer<typeof updateBlogSchema>;
export type SignUp = z.infer<typeof signUpInput>;
export type SignIn = z.infer<typeof signInInput>;
