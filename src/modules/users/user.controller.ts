import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../constants/pagination';
import { userFilterableFields } from '../../constants/user';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
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
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, userFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await UserService.getUsers(filters, paginationOptions);

    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users fetched successfully.',
      meta: result.meta,
      data: result.data,
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
