import { Schema, model } from 'mongoose';
import { IGallery } from '../public.interface';

const gallerySchema = new Schema<IGallery>(
  {
    image: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
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

export const Gallery = model<IGallery>('Gallery', gallerySchema);
