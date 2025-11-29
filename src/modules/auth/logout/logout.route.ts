import express from 'express';
import { LogoutController } from './logout.controller';

const router = express.Router();

router.post('/', LogoutController.logout);

export const LogoutRoutes = router;
