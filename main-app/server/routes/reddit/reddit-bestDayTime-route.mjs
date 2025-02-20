import express from 'express';
import { redditBestDayTime } from '../../controllers/reddit/reddit-bestDayTime-controller.mjs';

const router = express.Router();

router.get('/reddit-bestDayTime', redditBestDayTime);

export default router;