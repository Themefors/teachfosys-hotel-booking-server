import httpStatus from 'http-status';
import config from '../../../config';
import { getRedisClient } from '../../../config/redis';
import { OTP_EXPIRY_TIME } from '../../../constants/redis';
import ApiError from '../../../errors/ApiError';
import generateOtp from '../../../helpers/generateOtp';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { emailService } from '../../../shared/emailService';
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

const forgetPassword = async (email: string): Promise<void> => {
  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found with this email');
  }

  // Check if user is active
  if (user.status === EStatus.SUSPENDED) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your account has been suspended');
  }

  if (user.status === EStatus.DELETED) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your account has been deleted');
  }

  // Generate 6-digit OTP
  const otp = generateOtp(6);

  // Store OTP in Redis with 5 minutes expiration (300 seconds)
  const redisClient = getRedisClient();
  const redisKey = `otp:${email}`;

  await redisClient.set(redisKey, otp, { EX: OTP_EXPIRY_TIME });

  // Send OTP via email
  await emailService.sendOtpEmail(email, user.name, otp);
};

const verifyResetPassword = async (
  email: string,
  otp: string
): Promise<{ resetToken: string; user: IUser }> => {
  // Get OTP from Redis
  const redisClient = getRedisClient();
  const redisKey = `otp:${email}`;

  const storedOtp = await redisClient.get(redisKey);

  if (!storedOtp) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'OTP has expired or is invalid');
  }

  // Verify OTP
  if (storedOtp !== otp) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid OTP');
  }

  // Get user
  const user = await User.findOne({ email });

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

  // Delete OTP from Redis immediately after successful verification
  await redisClient.del(redisKey);

  // Generate reset token with 5 minutes expiration
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const resetToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt.secret as string,
    config.jwt.expires_in as string // 5 minutes expiration
  );

  return {
    resetToken,
    user,
  };
};

const resetPassword = async (
  userId: string,
  newPassword: string
): Promise<void> => {
  // Get user with password
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

  // Update password - the pre-save hook will hash it
  user.password = newPassword;
  await user.save();
};

export const ProfileService = {
  editMe,
  setPassword,
  forgetPassword,
  verifyResetPassword,
  resetPassword,
};
