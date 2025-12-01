import { Types } from 'mongoose';

export interface IAmenity {
  name: string;
  icon: string;
}

export interface IRoom {
  _id?: Types.ObjectId;
  images: string[];
  thumbnail: string;
  name: string;
  size: string;
  category: string;
  person_num: number;
  bed_room: number;
  bath_room: number;
  descriptions: string[];
  general_amenities: IAmenity[];
  room_amenities: IAmenity[];
  room_features: string[];
  start_date: Date;
  end_date: Date;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
