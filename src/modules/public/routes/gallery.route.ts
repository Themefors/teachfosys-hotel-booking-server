import express from 'express';
import validateRequest from '../../../app/middlewares/validateRequest';
import { GalleryController } from '../controllers/gallery.controller';
import { GalleryValidation } from '../validations/gallery.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(GalleryValidation.createGalleryZodSchema),
  GalleryController.createGallery
);

router.get('/', GalleryController.getGalleries);

router.get('/category/:category', GalleryController.getGalleryByCategory);

router.get('/:id', GalleryController.getGallery);

router.patch(
  '/:id',
  validateRequest(GalleryValidation.updateGalleryZodSchema),
  GalleryController.updateGallery
);

router.delete('/:id', GalleryController.deleteGallery);

export const GalleryRoutes = router;
