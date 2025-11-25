import express from 'express';
import validateRequest from '../../../app/middlewares/validateRequest';
import { SignupController } from './signup.controller';
import { SignupValidation } from './signup.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(SignupValidation.signupValidationSchema),
  SignupController.signup
);

export const SignupRoutes = router;
