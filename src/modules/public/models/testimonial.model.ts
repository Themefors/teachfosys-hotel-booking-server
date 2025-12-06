import { Schema, model } from 'mongoose';

const testimonialSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Testimonial = model('Testimonial', testimonialSchema);
