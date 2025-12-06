import { Gallery } from '../models/gallery.model';
import { IGallery } from '../public.interface';

const createGallery = async (payload: IGallery): Promise<IGallery> => {
  const result = await Gallery.create(payload);
  return result;
};

const getGalleries = async (): Promise<IGallery[]> => {
  const result = await Gallery.find({ deletedAt: { $exists: false } });
  return result;
};

const getGallery = async (id: string): Promise<IGallery | null> => {
  const result = await Gallery.findById(id);
  return result;
};

const getGalleryByCategory = async (category: string): Promise<IGallery[]> => {
  const result = await Gallery.find({
    category,
    deletedAt: { $exists: false },
  });
  return result;
};

const updateGallery = async (
  id: string,
  payload: Partial<IGallery>
): Promise<IGallery | null> => {
  const result = await Gallery.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteGallery = async (id: string): Promise<IGallery | null> => {
  const result = await Gallery.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true }
  );
  return result;
};

export const GalleryService = {
  createGallery,
  getGalleries,
  getGallery,
  getGalleryByCategory,
  updateGallery,
  deleteGallery,
};
