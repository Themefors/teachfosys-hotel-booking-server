import express from 'express';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { UserController } from './user.controller';
import { ERole } from './user.enum';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create',
  auth(ERole.ADMIN),
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get(
  '/',
  validateRequest(UserValidation.getUsersQuerySchema),
  UserController.getUsers
);

router.get(
  '/:id',
  auth(ERole.ADMIN),
  validateRequest(UserValidation.getUserParamSchema),
  UserController.getUser
);

export const UserRoutes = router;
