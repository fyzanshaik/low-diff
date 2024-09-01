import { Hono, HonoRequest } from 'hono';
import { HonoBindings } from '../types/types';
import { handleMiddleware } from '../middlewares/authMiddleware';
import { addUserBlog, deleteUserBlog, editUserBlog, getAllBlogs, getUserBlogs } from '../controllers/blogController';
const blogRouter = new Hono<{ Bindings: HonoBindings; Variables: HonoRequest }>();
/**
 * Add blogs POST
 * edit blogs PUT
 * delete blog DELETE
 * get all blogs at home feed GET
 * get all blogs of that particular User GET
 */

blogRouter.use('/*', async (c, next) => {
	handleMiddleware(c, next);
});

blogRouter.post('/', addUserBlog);
blogRouter.patch('/:id', editUserBlog);
blogRouter.delete('/:id', deleteUserBlog);
blogRouter.get('/:username', getUserBlogs);
blogRouter.get('/feed', getAllBlogs);

export { blogRouter };
