import express from 'express';
import auth from '../../app/middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { RoomController } from './room.controller';

const router = express.Router();

router.get('/', RoomController.getRooms);
router.get('/:roomId', RoomController.getRoomById);

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.MANAGER),
  RoomController.createRoom
);

router.patch(
  '/:roomId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.MANAGER),
  RoomController.updateRoom
);

export const RoomRoutes = router;
