import { z } from 'zod';
import { EGender, ERole, EStatus } from './user.enum';

const bdPhoneRegex = /^(?:\+?88)?01[0-9]{9}$/;

const createUserZodSchema = z.object({
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

    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, { message: 'Password must be at least 6 characters' }),

    dob: z
      .string()
      .datetime({ message: 'DOB must be a valid ISO date' })
      .optional(),

    phone: z
      .string()
      .optional()
      .refine(val => !val || bdPhoneRegex.test(val), {
        message: 'Invalid BD phone number. Use 017XXXXXXXX or +88017XXXXXXXX',
      }),

    gender: z
      .nativeEnum(EGender, {
        errorMap: () => ({ message: 'Invalid gender value' }),
      })
      .optional(),

    address: z.string().optional(),

    picture: z
      .string()
      .url({ message: 'Picture must be a valid URL' })
      .optional(),

    status: z
      .nativeEnum(EStatus, {
        errorMap: () => ({ message: 'Invalid status value' }),
      })
      .optional(),

    booking_id: z.string().optional(),

    role: z
      .nativeEnum(ERole, {
        errorMap: () => ({ message: 'Invalid role value' }),
      })
      .optional(),
  }),
});

const getUsersQuerySchema = z.object({
  query: z.object({
    searchTerm: z.string().optional(),
    role: z.nativeEnum(ERole).optional(),
    gender: z.nativeEnum(EGender).optional(),
    status: z.nativeEnum(EStatus).optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
});

const getUserParamSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'User ID is required',
    }),
  }),
});

const updateUserZodSchema = z.object({
  params: z.object({
    userId: z.string({
      required_error: 'User ID is required',
    }),
  }),
  body: z.object({
    name: z.string().min(1, { message: 'Name cannot be empty' }).optional(),
    dob: z
      .string()
      .datetime({ message: 'DOB must be a valid ISO date' })
      .optional(),
    phone: z
      .string()
      .optional()
      .refine(val => !val || bdPhoneRegex.test(val), {
        message: 'Invalid BD phone number. Use 017XXXXXXXX or +88017XXXXXXXX',
      }),
    gender: z
      .nativeEnum(EGender, {
        errorMap: () => ({ message: 'Invalid gender value' }),
      })
      .optional(),
    address: z.string().optional(),
    picture: z
      .string()
      .url({ message: 'Picture must be a valid URL' })
      .optional(),
    status: z
      .nativeEnum(EStatus, {
        errorMap: () => ({ message: 'Invalid status value' }),
      })
      .optional(),
    booking_id: z.string().optional(),
    role: z
      .nativeEnum(ERole, {
        errorMap: () => ({ message: 'Invalid role value' }),
      })
      .optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  getUsersQuerySchema,
  getUserParamSchema,
  updateUserZodSchema,
};
