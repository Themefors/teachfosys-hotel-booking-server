import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IGeneralInfo } from '../public.interface';
import { GeneralInfoService } from '../services/general-info.service';

const createGeneralInfo = catchAsync(
  async (
    req: Request<any, any, IGeneralInfo>,
    res: Response,
    next: NextFunction
  ) => {
    const result = await GeneralInfoService.createGeneralInfo(req.body);

    sendResponse<IGeneralInfo>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'General info created successfully.',
      data: result,
    });
  }
);

const getGeneralInfo = catchAsync(
  async (
    req: Request<any, any, IGeneralInfo[]>,
    res: Response,
    next: NextFunction
  ) => {
    const result = await GeneralInfoService.getGeneralInfo();

    sendResponse<IGeneralInfo[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'General info fetched successfully.',
      data: result,
    });
  }
);

const updateGeneralInfo = catchAsync(
  async (
    req: Request<any, any, IGeneralInfo>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const result = await GeneralInfoService.updateGeneralInfo(id, req.body);

    sendResponse<IGeneralInfo>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'General info update successfully.',
      data: result,
    });
  }
);

export const GeneralInfoController = {
  createGeneralInfo,
  getGeneralInfo,
  updateGeneralInfo,
};
