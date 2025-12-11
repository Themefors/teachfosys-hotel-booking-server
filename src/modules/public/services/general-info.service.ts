import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { GeneralInfo } from '../models/general-info.model';
import { IGeneralInfo } from '../public.interface';

const createGeneralInfo = async (
  payload: IGeneralInfo
): Promise<IGeneralInfo> => {
  console.log(payload);
  const hasGeneralInfo = await GeneralInfo.countDocuments();
  if (hasGeneralInfo > 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'There is already general info. Please update'
    );
  }

  const result = await GeneralInfo.create(payload);
  return result;
};

const getGeneralInfo = async () => {
  const result = await GeneralInfo.findOne();
  return result;
};

const updateGeneralInfo = async (
  id: string,
  payload: Partial<IGeneralInfo>
): Promise<IGeneralInfo | null> => {
  const result = await GeneralInfo.findOneAndUpdate(
    {},
    { $set: payload },
    { new: true }
  );
  return result;
};

export const GeneralInfoService = {
  createGeneralInfo,
  getGeneralInfo,
  updateGeneralInfo,
};
