import { Testimonial } from '../models/testimonial.model';
import { ITestimonial } from '../public.interface';

const createTestimonial = async (
  payload: ITestimonial
): Promise<ITestimonial> => {
  const result = await Testimonial.create(payload);
  return result;
};

const getTestimonials = async (): Promise<ITestimonial[] | null> => {
  const result = await Testimonial.find();
  return result;
};

const getTestimonialById = async (id: string): Promise<ITestimonial | null> => {
  const result = await Testimonial.findById(id);
  return result;
};

const updateTestimonial = async (
  id: string,
  payload: Partial<ITestimonial>
): Promise<ITestimonial | null> => {
  const result = await Testimonial.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  );
  return result;
};

const deleteTestimonial = async (id: string): Promise<ITestimonial | null> => {
  const result = await Testimonial.findByIdAndDelete(id);
  return result;
};

export const TestimonialService = {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
