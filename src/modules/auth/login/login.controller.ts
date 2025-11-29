import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { LoginService } from './login.service';

const login = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body;

  const result = await LoginService.login(loginData);
  const cookieOptions = {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
  };

  res.cookie('refreshToken', result.refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: {
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  // auth middleware already did:
  //   const token = req.headers.authorization;
  //   const verifiedUser = jwtHelpers.verifyToken(...)
  //   req.user = verifiedUser;

  const currentUser = req.user as any;

  if (!currentUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const user = await LoginService.getMe(currentUser.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Current user fetched successfully',
    data: user,
  });
});

export const LoginController = {
  login,
  getMe,
};
