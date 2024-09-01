import { Hono } from 'hono';
import { userSignInController, userSignUpController } from '../controllers/authController';
import { HonoBindings } from '../types';
const userAuthRouter = new Hono<{ Bindings: HonoBindings }>();

userAuthRouter.post('/user/signup', userSignUpController);
userAuthRouter.post('/user/signin', userSignInController);
export { userAuthRouter };
