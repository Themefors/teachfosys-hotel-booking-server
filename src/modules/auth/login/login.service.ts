import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { EStatus } from '../../users/user.enum';
import { IUser } from '../../users/user.interface';
import { User } from '../../users/user.model';
import { ILoginPayload, ILoginResponse } from './login.interface';

const login = async (payload: ILoginPayload): Promise<ILoginResponse> => {
  const { email, password } = payload;

  // Check if user exists
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  // Check if user is active
  if (user.status === EStatus.SUSPENDED) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your account has been suspended');
  }

  if (user.status === EStatus.DELETED) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your account has been deleted');
  }

  // Verify password
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  // Generate JWT tokens
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string
  );

  // Remove password from response
  const userObject = user.toJSON();

  return {
    user: {
      _id: userObject._id,
      name: userObject.name,
      email: userObject.email,
      role: userObject.role,
      phone: userObject.phone,
      status: userObject.status,
    },
    accessToken,
    refreshToken,
  };
};

const getMyBookings = async (userId: string) => {
  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required');
  }

  // const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });
  const bookings = {};

  return bookings;
};

const editMe = async (
  userId: string,
  payload: Partial<IUser>
): Promise<IUser> => {
  // Check if user exists
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Check if user is active
  if (user.status === EStatus.SUSPENDED) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your account has been suspended');
  }

  if (user.status === EStatus.DELETED) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your account has been deleted');
  }

  // Explicitly prevent updating sensitive fields
  const { email, password, role, ...allowedUpdates } = payload as any;

  // Update user with allowed fields only
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: allowedUpdates },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update user'
    );
  }

  return updatedUser;
};

export const LoginService = {
  login,
  getMyBookings,
  editMe,
};
