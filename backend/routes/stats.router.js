import express from 'express';

const router = express.Router();

import { getStats } from '../controller/stats.controller.js';

import authMiddleware from '../middleware/auth.middleware.js';


router.get('/stats', authMiddleware  ,getStats);

export default router;