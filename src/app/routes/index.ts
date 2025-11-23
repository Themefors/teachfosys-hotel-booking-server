import express from 'express';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/api/v1',
    routes: express.Router(), // Replace with actual route module
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
