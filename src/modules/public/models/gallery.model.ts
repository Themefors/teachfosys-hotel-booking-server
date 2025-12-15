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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Gallery = model<IGallery>('Gallery', gallerySchema);
