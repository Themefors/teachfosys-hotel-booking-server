import { Contact } from '../models/contact.model';
import { IContact } from '../public.interface';

const createContact = async (payload: IContact): Promise<IContact> => {
  const result = await Contact.create(payload);
  return result;
};

const getContacts = async (): Promise<IContact[]> => {
  const result = await Contact.find({ deletedAt: { $exists: false } });
  return result;
};

const getContact = async (id: string): Promise<IContact | null> => {
  const result = await Contact.findById(id);
  return result;
};

const updateContact = async (
  id: string,
  payload: Partial<IContact>
): Promise<IContact | null> => {
  const result = await Contact.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteContact = async (id: string): Promise<IContact | null> => {
  const result = await Contact.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true }
  );
  return result;
};

export const ContactService = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
};
