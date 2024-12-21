import express from 'express';
import { redditStats } from '../../controllers/reddit/reddit-stats-controller.mjs';

const router = express.Router();

router.get('/reddit-stats', redditStats);

export default router;