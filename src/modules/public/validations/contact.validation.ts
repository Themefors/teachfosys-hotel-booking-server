import { z } from 'zod';

export const createContactZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(1, { message: 'Name cannot be empty' }),

    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({ message: 'Invalid email format' }),

    subject: z
      .string({
        required_error: 'Subject is required',
      })
      .min(1, { message: 'Subject cannot be empty' }),

    message: z
      .string({
        required_error: 'Message is required',
      })
      .min(1, { message: 'Message cannot be empty' }),
  }),
});

export const updateContactZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name cannot be empty' }).optional(),

    email: z.string().email({ message: 'Invalid email format' }).optional(),

    subject: z
      .string()
      .min(1, { message: 'Subject cannot be empty' })
      .optional(),

    message: z
      .string()
      .min(1, { message: 'Message cannot be empty' })
      .optional(),
  }),
});

export const ContactValidation = {
  createContactZodSchema,
  updateContactZodSchema,
};
