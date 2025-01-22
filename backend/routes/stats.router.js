import express from 'express';

const router = express.Router();

import { getStats, getDepartmentStats, updateDepartment } from '../controller/stats.controller.js';

import authMiddleware from '../middleware/auth.middleware.js';


router.get('/stats', authMiddleware, getStats);
router.get('/stats/department/:department', authMiddleware, getDepartmentStats);
router.put('/update-department', authMiddleware, updateDepartment);

export default router;