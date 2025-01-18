import router from 'express';

const router = express.Router();

router.post('/rank', getStatsController);

export default router;