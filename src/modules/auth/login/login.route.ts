import express from 'express';
import auth from '../../../app/middlewares/auth';
import validateRequest from '../../../app/middlewares/validateRequest';
import { ERole } from '../../users/user.enum';
import { LoginController } from './login.controller';
import { LoginValidation } from './login.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(LoginValidation.loginValidationSchema),
  LoginController.login
);

router.patch(
  '/edit-me',
  auth(ERole.USER, ERole.ADMIN),
  validateRequest(LoginValidation.editMeValidationSchema),
  LoginController.editMe
);

export const LoginRoutes = router;
