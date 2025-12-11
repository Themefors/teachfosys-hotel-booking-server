import { Schema, model } from 'mongoose';

const generalInfoSchema = new Schema(
  {
    heroTitle: { type: String, required: true },
    heroSubtitle: { type: String, required: true },
    heroButtonText: { type: String, required: true },
    heroButtonLink: { type: String, required: true },
    logo: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    socials: {
      type: Schema.Types.Mixed,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    copy_right: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const GeneralInfo = model('GeneralInfo', generalInfoSchema);
