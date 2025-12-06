import { z } from 'zod';
import { EGender } from '../../users/user.enum';

export const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),

    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(1, 'Password is required'),
  }),
});

export const editMeValidationSchema = z.object({
  body: z.object({
    dob: z.string().optional(),
    phone: z.string().optional(),
    gender: z.nativeEnum(EGender).optional(),
    address: z.string().optional(),
    picture: z.string().optional(),
  }),
});

export const LoginValidation = {
  loginValidationSchema,
  editMeValidationSchema,
};
