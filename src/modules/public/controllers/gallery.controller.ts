import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IGallery } from '../public.interface';
import { GalleryService } from '../services/gallery.service';

const createGallery = catchAsync(
  async (
    req: Request<any, any, IGallery>,
    res: Response,
    next: NextFunction
  ) => {
    const result = await GalleryService.createGallery(req.body);

    sendResponse<IGallery>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Gallery item created successfully.',
      data: result,
    });
  }
);

const getGalleries = catchAsync(
  async (
    req: Request<any, any, IGallery[]>,
    res: Response,
    next: NextFunction
  ) => {
    const result = await GalleryService.getGalleries();

    sendResponse<IGallery[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Gallery items fetched successfully.',
      data: result,
    });
  }
);

const updateGallery = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await GalleryService.updateGallery(id, req.body);

    sendResponse<IGallery | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Gallery item updated successfully.',
      data: result,
    });
  }
);

const deleteGallery = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await GalleryService.deleteGallery(id);

    sendResponse<IGallery | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Gallery item deleted successfully.',
      data: result,
    });
  }
);

export const GalleryController = {
  createGallery,
  getGalleries,
  updateGallery,
  deleteGallery,
};
