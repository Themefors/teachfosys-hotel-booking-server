import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const logout = catchAsync(async (req: Request, res: Response) => {
  const cookieOptions = {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  };

  res.clearCookie('refreshToken', cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logout successful',
    data: null,
  });
});

export const LogoutController = {
  logout,
};
