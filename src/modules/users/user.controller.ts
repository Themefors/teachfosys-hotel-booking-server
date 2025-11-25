import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createUser = catchAsync(
  async (req: Request<any, any, IUser>, res: Response, next: NextFunction) => {
    const result = await UserService.createUser(req.body);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully.',
      data: result,
    });
  }
);

const getUsers = catchAsync(
  async (
    req: Request<any, any, IUser[]>,
    res: Response,
    next: NextFunction
  ) => {
    const result = await UserService.getUsers();

    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully.',
      data: result,
    });
  }
);

const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await UserService.getUser(id);

    sendResponse<IUser | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully.',
      data: result,
    });
  }
);

export const UserController = {
  createUser,
  getUsers,
  getUser,
};
