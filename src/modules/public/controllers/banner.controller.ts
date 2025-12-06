import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBanner } from '../public.interface';
import { BannerService } from '../services/banner.service';

const createBanner = catchAsync(
  async (
    req: Request<any, any, IBanner>,
    res: Response,
    next: NextFunction
  ) => {
    const result = await BannerService.createBanner(req.body);

    sendResponse<IBanner>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Banner created successfully.',
      data: result,
    });
  }
);

const getBanners = catchAsync(
  async (
    req: Request<any, any, IBanner[]>,
    res: Response,
    next: NextFunction
  ) => {
    const result = await BannerService.getBanners();

    sendResponse<IBanner[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Banners fetched successfully.',
      data: result,
    });
  }
);

const getBanner = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await BannerService.getBanner(id);

    sendResponse<IBanner | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Banner fetched successfully.',
      data: result,
    });
  }
);

const updateBanner = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await BannerService.updateBanner(id, req.body);

    sendResponse<IBanner | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Banner updated successfully.',
      data: result,
    });
  }
);

const deleteBanner = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await BannerService.deleteBanner(id);

    sendResponse<IBanner | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Banner deleted successfully.',
      data: result,
    });
  }
);

export const BannerController = {
  createBanner,
  getBanners,
  getBanner,
  updateBanner,
  deleteBanner,
};
