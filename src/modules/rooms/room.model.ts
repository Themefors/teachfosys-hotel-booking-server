import { model, Model, Schema } from 'mongoose';
import type { IAmenity, IRoom } from './room.interface';

// Instance methods
export interface IRoomMethods {
  getPriceForNights(nights: number): number;
}

// Model type
export type RoomModel = Model<IRoom, Record<string, never>, IRoomMethods>;

// Reusable sub-schema for amenities
const amenitySchema = new Schema<IAmenity>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false, // we don't need separate _id for each amenity
  }
);

const roomSchema = new Schema<IRoom, RoomModel, IRoomMethods>(
  {
    images: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String,
      // will be auto-set from images[0] if missing (see pre('save'))
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String, // e.g. "30 m²", "500 sq ft"
      required: true,
      trim: true,
    },
    category: {
      type: String, // e.g. "Deluxe", "Suite"
      required: true,
      trim: true,
    },
    person_num: {
      type: Number,
      required: true,
      min: 1,
    },
    bed_room: {
      type: Number,
      required: true,
      min: 0,
    },
    bath_room: {
      type: Number,
      required: true,
      min: 0,
    },
    descriptions: {
      type: [String],
      default: [],
    },
    general_amenities: {
      type: [amenitySchema],
      default: [],
    },
    room_amenities: {
      type: [amenitySchema],
      default: [],
    },
    room_features: {
      type: [String],
      default: [],
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    price: {
      type: Number, // per night
      required: true,
      min: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// 🔁 Pre-save: if no thumbnail, use first image
roomSchema.pre('save', function () {
  if (!this.thumbnail && Array.isArray(this.images) && this.images.length > 0) {
    this.thumbnail = this.images[0];
  }
});

// 🧮 Instance method: calculate total price for N nights
roomSchema.methods.getPriceForNights = function (nights: number): number {
  if (!nights || nights <= 0) return 0;
  return this.price * nights;
};

export const Room = model<IRoom, RoomModel>('Room', roomSchema);
