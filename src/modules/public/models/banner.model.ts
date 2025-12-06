import { Schema, model } from 'mongoose';
import { IBanner } from '../public.interface';

const bannerSchema = new Schema<IBanner>(
  {
    picture: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
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

export const Banner = model<IBanner>('Banner', bannerSchema);
