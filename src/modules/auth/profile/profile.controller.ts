import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const editMe = catchAsync(async (req: Request, res: Response) => {
  const currentUser = req.user as any;

  if (!currentUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const userId = currentUser.userId;

  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User id not found in token');
  }

  const updateData = req.body;

  const result = await ProfileService.editMe(userId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const setPassword = catchAsync(async (req: Request, res: Response) => {
  const currentUser = req.user as any;

  if (!currentUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const userId = currentUser.userId;

  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User id not found in token');
  }

  const { old_pass, new_pass } = req.body;

  await ProfileService.setPassword(userId, old_pass, new_pass);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: null,
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  await ProfileService.forgetPassword(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OTP sent successfully to your email',
    data: null,
  });
});

const verifyResetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const result = await ProfileService.verifyResetPassword(email, otp);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OTP verified successfully',
    data: {
      resetToken: result.resetToken,
      user: {
        _id: result.user._id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        phone: result.user.phone,
        dob: result.user.dob,
        gender: result.user.gender,
        address: result.user.address,
        picture: result.user.picture,
        status: result.user.status,
      },
    },
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const currentUser = req.user as any;

  if (!currentUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const userId = currentUser.userId;

  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User id not found in token');
  }

  const { new_pass } = req.body;

  await ProfileService.resetPassword(userId, new_pass);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully',
    data: null,
  });
});

export const ProfileController = {
  editMe,
  setPassword,
  forgetPassword,
  verifyResetPassword,
  resetPassword,
};
