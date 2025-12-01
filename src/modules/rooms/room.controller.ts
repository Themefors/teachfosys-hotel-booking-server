// src/app/modules/room/room.controller.ts
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import type { IRoomFilters } from './room.interface';
import { RoomService } from './room.service';

const getRooms = catchAsync(async (req: Request, res: Response) => {
  const {
    page,
    limit,
    sortBy,
    sortOrder,
    category,
    minCapacity,
    maxCapacity,
    startDate,
    endDate,
  } = req.query;

  const filters: IRoomFilters = {
    category: category as string | undefined,
    minCapacity: minCapacity ? Number(minCapacity) : undefined,
    maxCapacity: maxCapacity ? Number(maxCapacity) : undefined,
    startDate: startDate as string | undefined,
    endDate: endDate as string | undefined,
  };

  const paginationOptions = {
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
    sortBy: sortBy as string | undefined,
    sortOrder: (sortOrder as 'asc' | 'desc') || undefined,
  };

  const result = await RoomService.getAllRooms(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rooms retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getRoomById = catchAsync(async (req: Request, res: Response) => {
  const room = await RoomService.getSingleRoom(req.params.roomId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room retrieved successfully',
    data: room,
  });
});

export const RoomController = {
  getRooms,
  getRoomById,
};
