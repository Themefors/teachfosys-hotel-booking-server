import bcrypt from 'bcryptjs';
import { Schema, model } from 'mongoose';
import config from '../../config';
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
      select: false, // Don't include password in queries by default
    },
    role: {
      type: String,
      enum: ERole,
      default: ERole.USER,
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

// Pre-save middleware to hash password before saving
userSchema.pre('save', async function () {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return;
  }

  const saltRounds = Number(config.bycrypt_salt_rounds) || 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON response
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model<IUser, UserModel>('User', userSchema);
