import { Blog } from '../models/blog.model';
import { IBlog } from '../public.interface';

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const result = await Blog.create(payload);
  return result;
};

const getBlogs = async (): Promise<IBlog[]> => {
  const result = await Blog.find({ deletedAt: { $exists: false } }).sort({
    createdAt: -1,
  });
  return result;
};

const getBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findById(id);
  return result;
};

const getBlogByCategory = async (category: string): Promise<IBlog[]> => {
  const result = await Blog.find({
    category,
    deletedAt: { $exists: false },
  }).sort({ createdAt: -1 });
  return result;
};

const updateBlog = async (
  id: string,
  payload: Partial<IBlog>
): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true }
  );
  return result;
};

export const BlogService = {
  createBlog,
  getBlogs,
  getBlog,
  getBlogByCategory,
  updateBlog,
  deleteBlog,
};
