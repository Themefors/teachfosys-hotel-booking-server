import express from 'express';
import validateRequest from '../../../app/middlewares/validateRequest';
import { BannerController } from '../controllers/banner.controller';
import { BannerValidation } from '../validations/banner.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(BannerValidation.createBannerZodSchema),
  BannerController.createBanner
);

router.get('/', BannerController.getBanners);

router.get('/:id', BannerController.getBanner);

router.patch(
  '/:id',
  validateRequest(BannerValidation.updateBannerZodSchema),
  BannerController.updateBanner
);

router.delete('/:id', BannerController.deleteBanner);

export const BannerRoutes = router;
