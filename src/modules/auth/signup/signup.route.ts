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

router.post('/send-otp', SignupController.sendOtp);
router.post('/verify-otp', SignupController.verifyOtp);

export const SignupRoutes = router;
