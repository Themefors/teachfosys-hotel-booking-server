import express from 'express';
import auth from '../../app/middlewares/auth';
import { RoomController } from './room.controller';

const router = express.Router();

router.get('/', RoomController.getRooms);
router.get('/:roomId', RoomController.getRoomById);

router.post('/', auth('admin', 'manager'), RoomController.createRoom);

export const RoomRoutes = router;
