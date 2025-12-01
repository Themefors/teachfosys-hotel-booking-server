import { Types } from 'mongoose';
import { ENUM_BOOKING_STATUS } from './booking.enum';

export interface IBooking {
  _id?: Types.ObjectId;
  user_id: Types.ObjectId | string;
  room_id: Types.ObjectId | string;
  status: ENUM_BOOKING_STATUS;
  start_date: Date;
  end_date: Date;
  room_num: number;
  adult_num: number;
  child_num: number;
  total_price: number;
  nid_num: string;
  createdAt?: Date;
  updatedAt?: Date;
}
