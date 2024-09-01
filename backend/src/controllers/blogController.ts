import clientInitialization from '../prismaClient';
/**
 * Add blogs POST
 * edit blogs PUT
 * delete blog DELETE
 * get all blogs at home feed GET
 * get all blogs of that particular User GET
 */

export const addUserBlog = async (c: any) => {
	try {
		const prisma = await clientInitialization(c);
		const Post = prisma.post;
		const userId = c.get('userId');
		const { title, content } = c.req.json();
		//add zod validation and type check

		const blog = await Post.create({
			data: {
				title: title,
				content: content,
				authorId: userId,
			},
		});

		return c.json({
			message: 'Blog has been created',
			id: blog.id,
		});
	} catch (error) {
		console.error('Error signing up User: ', error);
		throw new Error('User SignUp Error');
	}
};

export const editUserBlog = async (c: any) => {
	try {
		const prisma = await clientInitialization(c);
		const Post = prisma.post;
		const userId = c.get('userId');
		const { title, content } = c.req.json();
		//add zod validation and type check
		const id = c.req.param('id');
		const blog = await Post.findFirst({
			where: {
				AND: [{ id: id }, { authorId: userId }],
			},
		});

		if (!blog) {
			return c.json({ error: 'Post not found or you do not have permission to edit this post' }, 404);
		}

		const updatedBlog = await Post.update({
			where: { id: id },
			data: {
				title: title,
				content: content,
			},
		});

		return c.json({
			message: 'Blog has been updated',
			id: updatedBlog.id,
		});
	} catch (error) {
		console.error('Error editing blog: ', error);
		throw new Error('Blog edit error');
	}
};
export const deleteUserBlog = async (c: any) => {
	try {
		const prisma = await clientInitialization(c);
		const Post = prisma.post;
		const userId = c.get('userId');
		//add zod validation and type check
		const id = c.req.param('id');
		const blog = await Post.findFirst({
			where: {
				AND: [{ id: id }, { authorId: userId }],
			},
		});

		if (!blog) {
			return c.json({ error: 'Post not found' }, 404);
		}

		const deletedBlog = await Post.delete({
			where: {
				id: id,
			},
		});

		return c.json({
			message: 'Blog has been deleted',
			id: deletedBlog.id,
		});
	} catch (error) {
		console.error('Error deleting blog: ', error);
		throw new Error('Blog Deletion Error');
	}
};
export const getAllBlogs = async (c: any) => {
	try {
		const prisma = await clientInitialization(c);
		const Post = prisma.post;
		//add zod validation and type check

		const allBlogs = await Post.findMany({
			where: {},
		});

		if (!allBlogs) {
			return c.status(500).json({ error: "Couldn't access blogs" });
		}

		return c.json({
			blogs: allBlogs,
		});
	} catch (error) {
		console.error('Error getting blogs: ', error);
		throw new Error('Blog Get Error');
	}
};
export const getUserBlogs = async (c: any) => {
	try {
		const prisma = await clientInitialization(c);
		const Post = prisma.post;
		const userId = c.get('userId');
		//add zod validation and type check

		const allBlogs = await Post.findMany({
			where: { authorId: userId },
		});

		return c.json({
			blogs: allBlogs,
		});
	} catch (error) {
		console.error('Error getting User blogs: ', error);
		throw new Error('Blog Get Error');
	}
};
