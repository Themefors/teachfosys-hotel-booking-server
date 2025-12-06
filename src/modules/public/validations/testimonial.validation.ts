import { z } from 'zod';

export const createTestimonialZodSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5),
    review: z.string().min(1),
    name: z.string().min(1),
    team: z.string().optional(),
  }),
});

export const updateTestimonialZodSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5).optional(),
    review: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    team: z.string().optional(),
  }),
});

export const TestimonialValidation = {
  createTestimonialZodSchema,
  updateTestimonialZodSchema,
};
