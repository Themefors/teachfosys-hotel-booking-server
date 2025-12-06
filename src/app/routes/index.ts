import express from 'express';
import { LoginRoutes } from '../../modules/auth/login/login.route';
import { LogoutRoutes } from '../../modules/auth/logout/logout.route';
import { ProfileRoutes } from '../../modules/auth/profile/profile.route';
import { SignupRoutes } from '../../modules/auth/signup/signup.route';
import { BannerRoutes } from '../../modules/public/routes/banner.route';
import { BlogRoutes } from '../../modules/public/routes/blog.route';
import { ContactRoutes } from '../../modules/public/routes/contact.route';
import { GalleryRoutes } from '../../modules/public/routes/gallery.route';
import { GeneralInfoRoutes } from '../../modules/public/routes/general-info.route';
import { SubscribeRoutes } from '../../modules/public/routes/subscribe.route';
import { TestimonialRoutes } from '../../modules/public/routes/testimonial.route';
import { RoomRoutes } from '../../modules/rooms/room.route';
import { UserRoutes } from '../../modules/users/user.route';

const router = express.Router();

const moduleRoutes = [
  { path: '/users', route: UserRoutes },
  { path: '/auth/signup', route: SignupRoutes },
  { path: '/auth/login', route: LoginRoutes },
  { path: '/auth/logout', route: LogoutRoutes },
  { path: '/auth/profile', route: ProfileRoutes },
  { path: '/rooms', route: RoomRoutes },
  { path: '/banners', route: BannerRoutes },
  { path: '/subscribe', route: SubscribeRoutes },
  { path: '/contact', route: ContactRoutes },
  { path: '/gallery', route: GalleryRoutes },
  { path: '/blogs', route: BlogRoutes },
  { path: '/general-info', route: GeneralInfoRoutes },
  { path: '/testimonials', route: TestimonialRoutes },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
