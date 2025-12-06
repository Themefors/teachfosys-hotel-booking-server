import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ITestimonial } from '../public.interface';
import { TestimonialService } from '../services/testimonial.service';

const createTestimonial = catchAsync(
  async (
    req: Request<any, any, ITestimonial>,
    res: Response,
    next: NextFunction
  ) => {
    const result = await TestimonialService.createTestimonial(req.body);

    sendResponse<ITestimonial>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Testimonial created successfully.',
      data: result,
    });
  }
);

const getTestimonials = catchAsync(
  async (
    req: Request<any, any, ITestimonial[]>,
    res: Response,
    next: NextFunction
  ) => {
    const result = await TestimonialService.getTestimonials();

    sendResponse<ITestimonial[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Testimonials fetched successfully.',
      data: result,
    });
  }
);

const getTestimonialById = catchAsync(
  async (
    req: Request<any, any, ITestimonial>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const result = await TestimonialService.getTestimonialById(id);

    sendResponse<ITestimonial>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Testimonial fetched successfully.',
      data: result,
    });
  }
);

const updateTestimonial = catchAsync(
  async (
    req: Request<any, any, ITestimonial>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const result = await TestimonialService.updateTestimonial(id, req.body);

    sendResponse<ITestimonial>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Testimonial updated successfully.',
      data: result,
    });
  }
);

const deleteTestimonial = catchAsync(
  async (
    req: Request<any, any, ITestimonial>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const result = await TestimonialService.deleteTestimonial(id);

    sendResponse<ITestimonial>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Testimonial deleted successfully.',
      data: result,
    });
  }
);

export const TestimonialController = {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
