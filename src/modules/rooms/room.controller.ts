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

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const roomData = req.body;

  const room = await RoomService.createRoom(roomData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Room created successfully',
    data: room,
  });
});

const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const updatedData = req.body; // partial IRoom

  const room = await RoomService.updateRoom(req.params.roomId, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room updated successfully',
    data: room,
  });
});

const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const { roomId } = req.params;

  const room = await RoomService.deleteRoom(roomId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room deleted successfully',
    data: room, // you can return null instead if you don't want to expose deleted data
  });
});

export const RoomController = {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
