import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IContact } from '../public.interface';
import { ContactService } from '../services/contact.service';

const createContact = catchAsync(
  async (
    req: Request<any, any, IContact>,
    res: Response,
    next: NextFunction
  ) => {
    const result = await ContactService.createContact(req.body);

    sendResponse<IContact>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Contact form submitted successfully.',
      data: result,
    });
  }
);

const getContacts = catchAsync(
  async (
    req: Request<any, any, IContact[]>,
    res: Response,
    next: NextFunction
  ) => {
    const result = await ContactService.getContacts();

    sendResponse<IContact[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Contacts fetched successfully.',
      data: result,
    });
  }
);

const getContact = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await ContactService.getContact(id);

    sendResponse<IContact | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Contact fetched successfully.',
      data: result,
    });
  }
);

const updateContact = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await ContactService.updateContact(id, req.body);

    sendResponse<IContact | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Contact updated successfully.',
      data: result,
    });
  }
);

const deleteContact = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await ContactService.deleteContact(id);

    sendResponse<IContact | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Contact deleted successfully.',
      data: result,
    });
  }
);

export const ContactController = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
};
