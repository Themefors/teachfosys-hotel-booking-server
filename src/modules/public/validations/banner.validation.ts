import { z } from 'zod';

export const createBannerZodSchema = z.object({
  body: z.object({
    picture: z
      .string({
        required_error: 'Picture is required',
      })
      .url({ message: 'Picture must be a valid URL' }),

    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(1, { message: 'Title cannot be empty' }),

    subtitle: z
      .string({
        required_error: 'Subtitle is required',
      })
      .min(1, { message: 'Subtitle cannot be empty' }),
  }),
});

export const updateBannerZodSchema = z.object({
  body: z.object({
    picture: z
      .string()
      .url({ message: 'Picture must be a valid URL' })
      .optional(),

    title: z.string().min(1, { message: 'Title cannot be empty' }).optional(),

    subtitle: z
      .string()
      .min(1, { message: 'Subtitle cannot be empty' })
      .optional(),
  }),
});

export const BannerValidation = {
  createBannerZodSchema,
  updateBannerZodSchema,
};
