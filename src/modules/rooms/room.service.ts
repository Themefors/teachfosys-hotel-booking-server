// src/app/modules/room/room.service.ts
import { SortOrder } from 'mongoose';
import { IOptions, paginationHelpers } from '../../helpers/paginationHelper';
import type { IRoom, IRoomFilters } from './room.interface';
import { Room } from './room.model';

type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

const getAllRooms = async (
  filters: IRoomFilters,
  options: IOptions
): Promise<IGenericResponse<IRoom[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options as IOptions);

  const andConditions: any[] = [];

  // Filter by category/type
  if (filters.category) {
    andConditions.push({
      category: filters.category,
    });
  }

  // Capacity filters (person_num)
  if (filters.minCapacity) {
    andConditions.push({
      person_num: { $gte: filters.minCapacity },
    });
  }

  if (filters.maxCapacity) {
    andConditions.push({
      person_num: { $lte: filters.maxCapacity },
    });
  }

  // Date range / availability
  // Simple logic: room must cover the entire desired range
  if (filters.startDate && filters.endDate) {
    const start = new Date(filters.startDate);
    const end = new Date(filters.endDate);

    andConditions.push({
      start_date: { $lte: start },
      end_date: { $gte: end },
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy) {
    sortConditions[sortBy] = sortOrder === 'asc' ? 1 : -1;
  } else {
    sortConditions['createdAt'] = -1;
  }

  const result = await Room.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Room.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const RoomService = {
  getAllRooms,
};
