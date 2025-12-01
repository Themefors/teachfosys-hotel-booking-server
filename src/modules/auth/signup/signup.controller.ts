import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SignupService } from './signup.service';

const signup = catchAsync(async (req: Request, res: Response) => {
  const signupData = req.body;

  const result = await SignupService.signup(signupData);

  const cookieOptions = {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
  };

  res.cookie('refreshToken', result.refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully! Welcome email sent.',
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
});

const sendOtp = catchAsync(async (req: Request, res: Response) => {
  await SignupService.sendOtp(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'OTP Sent Successfully',
    data: null,
  });
});

const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  await SignupService.verifyOtp(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'OTP Verified Successfully',
    data: null,
  });
});

export const SignupController = {
  signup,
  sendOtp,
  verifyOtp,
};
