import express from 'express';
import { redditBestWeeklyTimes } from '../../controllers/reddit/reddit-bestWeekTime-controller.mjs';

const router = express.Router();

router.get('/reddit-bestWeekTime', redditBestWeeklyTimes);

export default router;