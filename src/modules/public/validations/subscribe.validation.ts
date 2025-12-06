import { z } from 'zod';

export const createSubscribeZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({ message: 'Invalid email format' }),
  }),
});

export const SubscribeValidation = {
  createSubscribeZodSchema,
};
