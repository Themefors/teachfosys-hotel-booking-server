import express from 'express';
import { RoomController } from './room.controller';

const router = express.Router();

router.get('/', RoomController.getRooms);

export const RoomRoutes = router;
