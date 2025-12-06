import httpStatus from 'http-status';
import { isValidObjectId, SortOrder } from 'mongoose';
import { userSearchableFields } from '../../constants/user';
import ApiError from '../../errors/ApiError';
import { IOptions, paginationHelpers } from '../../helpers/paginationHelper';
import { ERole, EStatus } from './user.enum';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: IUser): Promise<IUser> => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, 'Email already exists');
  }

  // Create user
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

const getUser = async (id: string): Promise<IUser> => {
  if (!isValidObjectId(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user ID');
  }

  const result = await User.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return result;
};

const updateUser = async (
  userId: string,
  currentUserId: string,
  currentUserRole: string,
  payload: Partial<IUser>
): Promise<IUser> => {
  // Validate MongoDB ObjectId
  if (!isValidObjectId(userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user ID');
  }

  // Prevent self-update
  if (userId === currentUserId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You cannot update your own profile through this endpoint'
    );
  }

  // Get target user
  const targetUser = await User.findById(userId);

  if (!targetUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Manager role restrictions
  if (currentUserRole === ERole.MANAGER) {
    // Managers can only update regular users
    if (targetUser.role !== ERole.USER) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'Managers can only update regular users'
      );
    }

    // Managers cannot change user role
    if (payload.role && payload.role !== ERole.USER) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'Managers cannot change user roles'
      );
    }
  }

  // Explicitly prevent updating email and password
  const { email, password, ...allowedUpdates } = payload as any;

  if (email || password) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Email and password cannot be updated through this endpoint'
    );
  }

  // Update user
  const result = await User.findByIdAndUpdate(
    userId,
    { $set: allowedUpdates },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update user'
    );
  }

  return result;
};

export const UserService = {
  createUser,
  getUsers,
  getUser,
  updateUser,
};
