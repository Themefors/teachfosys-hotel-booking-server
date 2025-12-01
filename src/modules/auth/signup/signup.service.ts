import httpStatus from 'http-status';
import config from '../../../config';
import { getRedisClient } from '../../../config/redis';
import { OTP_EXPIRY_TIME } from '../../../constants/redis';
import ApiError from '../../../errors/ApiError';
import generateOtp from '../../../helpers/generateOtp';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { emailService } from '../../../shared/emailService';
import { logger } from '../../../shared/logger';
import { EStatus } from '../../users/user.enum';
import { IUser } from '../../users/user.interface';
import { User } from '../../users/user.model';
import { TSignupPayload, TSignupResponse } from './signup.interface';

const signup = async (payload: TSignupPayload): Promise<TSignupResponse> => {
  const { email, name, password, phone, gender, address, role, dob } = payload;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'User already exists with this email'
    );
  }

  const newUser = await User.create({
    name,
    email,
    password,
    phone,
    gender,
    address,
    role,
    dob,
  });

  if (!newUser) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create user'
    );
  }

  // Generate JWT tokens
  const jwtPayload = {
    userId: newUser._id,
    email: newUser.email,
    role: newUser.role,
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

  emailService
    .sendWelcomeEmail(newUser.email, newUser.name)
    .then(() => {
      logger.info(`Welcome email sent successfully to ${newUser.email}`);
    })
    .catch(error => {
      logger.error(`Failed to send welcome email to ${newUser.email}:`, error);
    });

  // Remove password from response
  const userObject = newUser.toJSON();

  return {
    user: userObject,
    accessToken,
    refreshToken,
  };
};

const sendOtp = async ({ email, name }: Pick<IUser, 'email' | 'name'>) => {
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (existingUser.status === EStatus.ACTIVE) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User is already verified');
  }

  const otp = generateOtp();

  const redisKey = `otp:${email}`;

  await getRedisClient().set(redisKey, otp, {
    expiration: {
      type: 'EX',
      value: OTP_EXPIRY_TIME,
    },
  });

  await emailService.sendOtpEmail(email, name, otp);
};

export const SignupService = {
  signup,
  sendOtp,
};
