import { Hono } from 'hono';
import { userSignInController, userSignUpController } from '../controllers/authController';
import { HonoBindings } from '../types/types';
const userRouter = new Hono<{ Bindings: HonoBindings }>();

userRouter.post('/signup', userSignUpController);
userRouter.post('/signin', userSignInController);
export { userRouter };
