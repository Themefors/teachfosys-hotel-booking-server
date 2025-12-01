import express from 'express';
import { RoomController } from './room.controller';

const router = express.Router();

router.get('/', RoomController.getRooms);
router.get('/:roomId', RoomController.getRoomById);

export const RoomRoutes = router;
