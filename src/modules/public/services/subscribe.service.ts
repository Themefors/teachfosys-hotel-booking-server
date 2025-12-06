import { Subscribe } from '../models/subscribe.model';
import { ISubscribe } from '../public.interface';

const createSubscription = async (payload: ISubscribe): Promise<ISubscribe> => {
  const result = await Subscribe.create(payload);
  return result;
};

const getSubscriptions = async (): Promise<ISubscribe[]> => {
  const result = await Subscribe.find({ deletedAt: { $exists: false } });
  return result;
};

const getSubscription = async (id: string): Promise<ISubscribe | null> => {
  const result = await Subscribe.findById(id);
  return result;
};

const deleteSubscription = async (id: string): Promise<ISubscribe | null> => {
  const result = await Subscribe.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true }
  );
  return result;
};

export const SubscribeService = {
  createSubscription,
  getSubscriptions,
  getSubscription,
  deleteSubscription,
};
