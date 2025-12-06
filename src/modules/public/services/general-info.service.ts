import { GeneralInfo } from '../models/general-info.model';
import { IGeneralInfo } from '../public.interface';

const createGeneralInfo = async (
  payload: IGeneralInfo
): Promise<IGeneralInfo> => {
  const result = await GeneralInfo.create(payload);
  return result;
};

const getGeneralInfos = async (): Promise<IGeneralInfo[] | null> => {
  const result = await GeneralInfo.find();
  return result;
};

const updateGeneralInfo = async (
  id: string,
  payload: Partial<IGeneralInfo>
): Promise<IGeneralInfo | null> => {
  const result = await GeneralInfo.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  );
  return result;
};

export const GeneralInfoService = {
  createGeneralInfo,
  getGeneralInfos,
  updateGeneralInfo,
};
