import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ISubscribe } from '../public.interface';
import { SubscribeService } from '../services/subscribe.service';

const createSubscription = catchAsync(
  async (
    req: Request<any, any, ISubscribe>,
    res: Response,
    next: NextFunction
  ) => {
    const result = await SubscribeService.createSubscription(req.body);

    sendResponse<ISubscribe>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Subscription created successfully.',
      data: result,
    });
  }
);

const getSubscriptions = catchAsync(
  async (
    req: Request<any, any, ISubscribe[]>,
    res: Response,
    next: NextFunction
  ) => {
    const result = await SubscribeService.getSubscriptions();

    sendResponse<ISubscribe[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subscriptions fetched successfully.',
      data: result,
    });
  }
);

const getSubscription = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await SubscribeService.getSubscription(id);

    sendResponse<ISubscribe | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subscription fetched successfully.',
      data: result,
    });
  }
);

const deleteSubscription = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await SubscribeService.deleteSubscription(id);

    sendResponse<ISubscribe | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subscription deleted successfully.',
      data: result,
    });
  }
);

export const SubscribeController = {
  createSubscription,
  getSubscriptions,
  getSubscription,
  deleteSubscription,
};
