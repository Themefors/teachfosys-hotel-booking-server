import { z } from 'zod';

export const createGeneralInfoZodSchema = z.object({
  body: z.object({
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    heroButtonText: z.string(),
    heroButtonLink: z.string(),
    logo: z.string().optional(),
    location: z.string(),
    description: z.string(),
    socials: z.record(z.string()),
    address: z.string(),
    email: z.string().email(),
    phone: z.string(),
    copy_right: z.string(),
  }),
});

export const updateGeneralInfoZodSchema = z.object({
  body: z.object({
    heroTitle: z.string().optional(),
    heroSubtitle: z.string().optional(),
    heroButtonText: z.string().optional(),
    heroButtonLink: z.string().optional(),
    logo: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    socials: z.record(z.string()).optional(),
    address: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    copy_right: z.string().optional(),
  }),
});

export const GeneralInfoValidation = {
  createGeneralInfoZodSchema,
  updateGeneralInfoZodSchema,
};
