import express from 'express';
import validateRequest from '../../app/middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get(
  '/',
  validateRequest(UserValidation.getUsersQuerySchema),
  UserController.getUsers
);

export const UserRoutes = router;
