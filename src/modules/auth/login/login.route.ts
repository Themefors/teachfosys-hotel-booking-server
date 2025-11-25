import express from 'express';
import validateRequest from '../../../app/middlewares/validateRequest';
import { LoginController } from './login.controller';
import { LoginValidation } from './login.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(LoginValidation.loginValidationSchema),
  LoginController.login
);

export const LoginRoutes = router;
