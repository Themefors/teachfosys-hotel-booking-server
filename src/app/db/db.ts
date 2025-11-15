import { connect } from 'mongoose';
import config from '../config';

export const connectDB = async () => {
  await connect(config.DB_URL);
  console.log('Database connected!');
};
