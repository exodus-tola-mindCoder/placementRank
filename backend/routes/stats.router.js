import express from 'express';

const router = express.Router();

import { getStats, getDepartmentStats } from '../controller/stats.controller.js';

import authMiddleware from '../middleware/auth.middleware.js';


router.get('/stats', authMiddleware, getStats);
router.get('/stats/department/:department', authMiddleware, getDepartmentStats);

export default router;