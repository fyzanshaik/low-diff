import { Hono } from 'hono';
import { userRouter } from './routes/userAuth';
import { HonoBindings } from './types/types';
import { cors } from 'hono/cors';
import { blogRouter } from './routes/blogRouter';

const app = new Hono<{ Bindings: HonoBindings }>();

app.use('/*', cors());
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app;
