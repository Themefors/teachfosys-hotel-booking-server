import { model, Model, Schema } from 'mongoose';
import { ENUM_BOOKING_STATUS } from './booking.enum';
import { IBooking } from './booking.interface';

export type BookingModel = Model<IBooking>;

const bookingSchema = new Schema<IBooking>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    room_id: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ENUM_BOOKING_STATUS),
      default: ENUM_BOOKING_STATUS.PENDING,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    room_num: {
      type: Number,
      required: true,
      min: 1,
    },
    adult_num: {
      type: Number,
      required: true,
      min: 1,
    },
    child_num: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    total_price: {
      type: Number,
      required: true,
      min: 0,
    },
    nid_num: {
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Booking = model<IBooking, BookingModel>('Booking', bookingSchema);
