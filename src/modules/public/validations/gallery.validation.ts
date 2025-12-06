import { z } from 'zod';

export const createGalleryZodSchema = z.object({
  body: z.object({
    image: z
      .string({
        required_error: 'Image is required',
      })
      .url({ message: 'Image must be a valid URL' }),

    caption: z
      .string({
        required_error: 'Caption is required',
      })
      .min(1, { message: 'Caption cannot be empty' }),

    category: z
      .string({
        required_error: 'Category is required',
      })
      .min(1, { message: 'Category cannot be empty' }),
  }),
});

export const updateGalleryZodSchema = z.object({
  body: z.object({
    image: z.string().url({ message: 'Image must be a valid URL' }).optional(),

    caption: z
      .string()
      .min(1, { message: 'Caption cannot be empty' })
      .optional(),

    category: z
      .string()
      .min(1, { message: 'Category cannot be empty' })
      .optional(),
  }),
});

export const GalleryValidation = {
  createGalleryZodSchema,
  updateGalleryZodSchema,
};
