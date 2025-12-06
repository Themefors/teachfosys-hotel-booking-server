import express from 'express';
import auth from '../../../app/middlewares/auth';
import validateRequest from '../../../app/middlewares/validateRequest';
import { ERole } from '../../users/user.enum';
import { ProfileController } from './profile.controller';
import { ProfileValidation } from './profile.validation';

const router = express.Router();

router.patch(
  '/edit-me',
  auth(ERole.USER, ERole.ADMIN),
  validateRequest(ProfileValidation.editMeValidationSchema),
  ProfileController.editMe
);

export const ProfileRoutes = router;
