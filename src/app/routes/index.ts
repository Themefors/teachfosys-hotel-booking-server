import express from 'express';
import { LoginRoutes } from '../../modules/auth/login/login.route';
import { SignupRoutes } from '../../modules/auth/signup/signup.route';
import { UserRoutes } from '../../modules/users/user.route';
const router = express.Router();

const moduleRoutes = [
  { path: '/users', route: UserRoutes },
  { path: '/auth/signup', route: SignupRoutes },
  { path: '/auth/login', route: LoginRoutes },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
