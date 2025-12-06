import express from 'express';
import validateRequest from '../../../app/middlewares/validateRequest';
import { TestimonialController } from '../controllers/testimonial.controller';
import { TestimonialValidation } from '../validations/testimonial.validation';

const router = express.Router();

router.get('/', TestimonialController.getTestimonials);

router.get('/:id', TestimonialController.getTestimonialById);

router.post(
  '/create',
  validateRequest(TestimonialValidation.createTestimonialZodSchema),
  TestimonialController.createTestimonial
);

router.patch(
  '/:id',
  validateRequest(TestimonialValidation.updateTestimonialZodSchema),
  TestimonialController.updateTestimonial
);

router.delete('/:id', TestimonialController.deleteTestimonial);

export const TestimonialRoutes = router;
