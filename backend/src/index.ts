import { Hono } from 'hono';
import { userAuthRouter } from './routes/userAuth';
import { HonoBindings } from './types';

const app = new Hono<{ Bindings: HonoBindings }>();
/**
 * /user/signup
 * /user/signin
 */
app.route('/api/v1', userAuthRouter);

app.put('/api/v1/blog', (c) => {
	return c.text('Blog Updated');
});

app.get('/api/v1/blog/:id', (c) => {
	return c.text('Single Blog');
});

app.get('/api/v1/blog/bulk', (c) => {
	return c.text('Bulk Blogs');
});

export default app;
