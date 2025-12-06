import express from 'express';
import validateRequest from '../../../app/middlewares/validateRequest';
import { SubscribeController } from '../controllers/subscribe.controller';
import { SubscribeValidation } from '../validations/subscribe.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(SubscribeValidation.createSubscribeZodSchema),
  SubscribeController.createSubscription
);

router.get('/', SubscribeController.getSubscriptions);

router.get('/:id', SubscribeController.getSubscription);

router.delete('/:id', SubscribeController.deleteSubscription);

export const SubscribeRoutes = router;
