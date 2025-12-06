import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { EStatus } from '../../users/user.enum';
import { IUser } from '../../users/user.interface';
import { User } from '../../users/user.model';

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

const setPassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  // Check if user exists and get password
  const user = await User.findById(userId).select('+password');

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

  // Verify old password
  const isPasswordValid = await user.comparePassword(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  // Check if new password is same as old password
  const isSamePassword = await user.comparePassword(newPassword);

  if (isSamePassword) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'New password cannot be the same as old password'
    );
  }

  // Update password - the pre-save hook will hash it
  user.password = newPassword;
  await user.save();
};

export const ProfileService = {
  editMe,
  setPassword,
};
