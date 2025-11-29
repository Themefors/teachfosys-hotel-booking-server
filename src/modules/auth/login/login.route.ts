import express from 'express';
import auth from '../../../app/middlewares/auth';
import validateRequest from '../../../app/middlewares/validateRequest';
import { LoginController } from './login.controller';
import { LoginValidation } from './login.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(LoginValidation.loginValidationSchema),
  LoginController.login
);

router.get('/me', auth(), LoginController.getMe);

export const LoginRoutes = router;
