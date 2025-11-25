import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { EStatus } from '../../users/user.enum';
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

export const LoginService = {
  login,
};
