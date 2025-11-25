import { EStatus } from './user.enum';
import { IUser } from './user.interface';
import { User } from './user.model';

/**
 * Creates a new user and returns the created user populated with their academic faculty.
 * @param {IUser} payload - The user data to be created.
 * @returns {Promise<IUser>} The created user populated with their academic faculty.
 */
const createUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};
const getUsers = async (): Promise<IUser[] | null> => {
  const result = await User.find({ status: EStatus.ACTIVE });
  return result;
};

export const UserService = {
  createUser,
  getUsers,
};
