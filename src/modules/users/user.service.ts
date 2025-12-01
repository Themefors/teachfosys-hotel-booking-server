import { EStatus } from './user.enum';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};

const getUsers = async (): Promise<IUser[] | null> => {
  const result = await User.find({ status: EStatus.ACTIVE });
  return result;
};

const getUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

export const UserService = {
  createUser,
  getUsers,
  getUser,
};
