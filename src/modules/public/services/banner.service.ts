import { Banner } from '../models/banner.model';
import { IBanner } from '../public.interface';

const createBanner = async (payload: IBanner): Promise<IBanner> => {
  const result = await Banner.create(payload);
  return result;
};

const getBanners = async (): Promise<IBanner[]> => {
  const result = await Banner.find({ deletedAt: { $exists: false } });
  return result;
};

const getBanner = async (id: string): Promise<IBanner | null> => {
  const result = await Banner.findById(id);
  return result;
};

const updateBanner = async (
  id: string,
  payload: Partial<IBanner>
): Promise<IBanner | null> => {
  const result = await Banner.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBanner = async (id: string): Promise<IBanner | null> => {
  const result = await Banner.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true }
  );
  return result;
};

export const BannerService = {
  createBanner,
  getBanners,
  getBanner,
  updateBanner,
  deleteBanner,
};
