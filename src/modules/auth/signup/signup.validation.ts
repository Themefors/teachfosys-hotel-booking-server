import { z } from 'zod';
import { EGender, ERole } from '../../users/user.enum';

export const signupValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be less than 100 characters'),

    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),

    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must be less than 50 characters'),

    phone: z
      .string()
      .regex(/^[0-9]{10,15}$/, 'Phone number must be between 10-15 digits')
      .optional(),

    gender: z.nativeEnum(EGender).optional(),

    address: z
      .string()
      .max(255, 'Address must be less than 255 characters')
      .optional(),

    role: z.nativeEnum(ERole).optional(),

    dob: z.string().optional(),
  }),
});

export const SignupValidation = {
  signupValidationSchema,
};
