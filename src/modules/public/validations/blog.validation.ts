import { z } from 'zod';

export const createBlogZodSchema = z.object({
  body: z.object({
    image: z
      .string({
        required_error: 'Image is required',
      })
      .url({ message: 'Image must be a valid URL' }),

    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(1, { message: 'Title cannot be empty' }),

    content: z
      .string({
        required_error: 'Content is required',
      })
      .min(1, { message: 'Content cannot be empty' }),

    category: z
      .string({
        required_error: 'Category is required',
      })
      .min(1, { message: 'Category cannot be empty' }),
  }),
});

export const updateBlogZodSchema = z.object({
  body: z.object({
    image: z.string().url({ message: 'Image must be a valid URL' }).optional(),

    title: z.string().min(1, { message: 'Title cannot be empty' }).optional(),

    content: z
      .string()
      .min(1, { message: 'Content cannot be empty' })
      .optional(),

    category: z
      .string()
      .min(1, { message: 'Category cannot be empty' })
      .optional(),
  }),
});

export const BlogValidation = {
  createBlogZodSchema,
  updateBlogZodSchema,
};
