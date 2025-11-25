import { IUser } from '../../users/user.interface';

export interface ISignup {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export type TSignupPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  gender?: string;
  address?: string;
  role?: string;
  dob?: string;
};

export type TSignupResponse = {
  user: Partial<IUser>;
  accessToken: string;
  refreshToken: string;
};
