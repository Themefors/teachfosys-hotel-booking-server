import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  DB_URL:
    process.env.DB_URL ||
    'mongodb://127.0.0.1:27017/mongodb://127.0.0.1:27017/hotelBookingDB',
};
