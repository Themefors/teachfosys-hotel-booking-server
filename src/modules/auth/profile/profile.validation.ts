import { z } from 'zod';
import { EGender } from '../../users/user.enum';

export const editMeValidationSchema = z.object({
  body: z.object({
    dob: z.string().optional(),
    phone: z.string().optional(),
    gender: z.nativeEnum(EGender).optional(),
    address: z.string().optional(),
    picture: z.string().optional(),
  }),
});

export const setPasswordValidationSchema = z.object({
  body: z.object({
    old_pass: z
      .string({
        required_error: 'Old password is required',
      })
      .min(1, 'Old password is required'),
    new_pass: z
      .string({
        required_error: 'New password is required',
      })
      .min(6, { message: 'New password must be at least 6 characters' }),
  }),
});

export const ProfileValidation = {
  editMeValidationSchema,
  setPasswordValidationSchema,
};
