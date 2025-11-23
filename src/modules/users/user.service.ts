import { IUser } from './user.interface';
import { User } from './user.model';

/**
 * Creates a new user and returns the created user populated with their academic faculty.
 * @param {IUser} payload - The user data to be created.
 * @returns {Promise<IUser>} The created user populated with their academic faculty.
 */
const createUser = async (payload: IUser): Promise<IUser> => {
  const result = (await User.create(payload)).populate('academicFaculty');
  return result;
};

export const UserService = {
  createUser,
};
