import { SortOrder } from 'mongoose';
import { userSearchableFields } from '../../constants/user';
import { IOptions, paginationHelpers } from '../../helpers/paginationHelper';
import { EStatus } from './user.enum';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};

type IUserFilters = {
  searchTerm?: string;
  role?: string;
  gender?: string;
  status?: string;
};

const getUsers = async (
  filters: IUserFilters,
  paginationOptions: IOptions
): Promise<{
  data: IUser[];
  meta: { page: number; limit: number; total: number };
}> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search term condition
  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filter conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Default condition: only active users
  // Remove this if you want to show all statuses when status filter is not provided
  if (!filtersData.status) {
    andConditions.push({ status: EStatus.ACTIVE });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    data: result,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

export const UserService = {
  createUser,
  getUsers,
  getUser,
};
