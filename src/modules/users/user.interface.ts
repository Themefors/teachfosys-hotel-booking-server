import { Model } from 'mongoose';
import { EGender, ERole, EStatus } from './user.enum';

export type IUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  dob?: string;
  phone?: string;
  gender?: EGender;
  address?: string;
  picture?: string;
  status?: EStatus;
  booking_id?: string;
  role?: ERole;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type IUserMethods = {
  comparePassword(candidatePassword: string): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
