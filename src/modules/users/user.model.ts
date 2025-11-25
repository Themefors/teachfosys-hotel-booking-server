import { Schema, model } from 'mongoose';
import { EGender, ERole, EStatus } from './user.enum';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ERole,
      default: ERole.ADMIN,
    },
    dob: {
      type: String,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
      enum: EGender,
      default: EGender.OTHERS,
    },
    address: {
      type: String,
    },
    picture: {
      type: String,
    },
    status: {
      type: String,
      enum: EStatus,
      default: EStatus.ACTIVE,
    },
    booking_id: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const User = model<IUser, UserModel>('User', userSchema);
