import { Schema, model } from 'mongoose';
import { ISubscribe } from '../public.interface';

const subscribeSchema = new Schema<ISubscribe>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
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

export const Subscribe = model<ISubscribe>('Subscribe', subscribeSchema);
