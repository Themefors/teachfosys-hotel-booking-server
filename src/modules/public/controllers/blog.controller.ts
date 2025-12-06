import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBlog } from '../public.interface';
import { BlogService } from '../services/blog.service';

const createBlog = catchAsync(
  async (req: Request<any, any, IBlog>, res: Response, next: NextFunction) => {
    const result = await BlogService.createBlog(req.body);

    sendResponse<IBlog>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Blog post created successfully.',
      data: result,
    });
  }
);

const getBlogs = catchAsync(
  async (
    req: Request<any, any, IBlog[]>,
    res: Response,
    next: NextFunction
  ) => {
    const result = await BlogService.getBlogs();

    sendResponse<IBlog[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog posts fetched successfully.',
      data: result,
    });
  }
);

const getBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await BlogService.getBlog(id);

    sendResponse<IBlog | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog post fetched successfully.',
      data: result,
    });
  }
);

const getBlogByCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { category } = req.params;
    const result = await BlogService.getBlogByCategory(category);

    sendResponse<IBlog[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog posts by category fetched successfully.',
      data: result,
    });
  }
);

const updateBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await BlogService.updateBlog(id, req.body);

    sendResponse<IBlog | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog post updated successfully.',
      data: result,
    });
  }
);

const deleteBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await BlogService.deleteBlog(id);

    sendResponse<IBlog | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog post deleted successfully.',
      data: result,
    });
  }
);

export const BlogController = {
  createBlog,
  getBlogs,
  getBlog,
  getBlogByCategory,
  updateBlog,
  deleteBlog,
};
