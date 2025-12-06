import express from 'express';
import validateRequest from '../../../app/middlewares/validateRequest';
import { BlogController } from '../controllers/blog.controller';
import { BlogValidation } from '../validations/blog.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(BlogValidation.createBlogZodSchema),
  BlogController.createBlog
);

router.get('/', BlogController.getBlogs);

router.get('/category/:category', BlogController.getBlogByCategory);

router.get('/:id', BlogController.getBlog);

router.patch(
  '/:id',
  validateRequest(BlogValidation.updateBlogZodSchema),
  BlogController.updateBlog
);

router.delete('/:id', BlogController.deleteBlog);

export const BlogRoutes = router;
