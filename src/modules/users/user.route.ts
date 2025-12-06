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
  auth(ERole.ADMIN, ERole.MANAGER, ERole.ACCOUNTS, ERole.STUFF),
  validateRequest(UserValidation.getUsersQuerySchema),
  UserController.getUsers
);

router.get(
  '/:userId',
  auth(ERole.ADMIN, ERole.MANAGER, ERole.ACCOUNTS, ERole.STUFF),
  validateRequest(UserValidation.getUserParamSchema),
  UserController.getUser
);

router.patch(
  '/:userId',
  auth(ERole.ADMIN, ERole.MANAGER),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

router.delete(
  '/:userId',
  auth(ERole.ADMIN, ERole.MANAGER),
  validateRequest(UserValidation.deleteUserParamSchema),
  UserController.deleteUser
);

export const UserRoutes = router;
