import { z } from 'zod';
import { EGender } from '../../users/user.enum';

const editMeValidationSchema = z.object({
  body: z.object({
    dob: z.string().optional(),
    phone: z.string().optional(),
    gender: z.nativeEnum(EGender).optional(),
    address: z.string().optional(),
    picture: z.string().optional(),
  }),
});

const setPasswordValidationSchema = z.object({
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

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),
  }),
});

const verifyResetPasswordValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),
    otp: z
      .string({
        required_error: 'OTP is required',
      })
      .length(6, 'OTP must be 6 digits'),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
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
  forgetPasswordValidationSchema,
  verifyResetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
