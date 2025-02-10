import express from 'express';
import { scheduleRedditPosts } from '../../controllers/services/redditScheduler.mjs';

const router = express.Router();

router.get('/run-cron-reddit', async (req, res) => {
    await scheduleRedditPosts();
    res.json({
        success: true,
        message: 'Job eseguito: pubblicazione su Reddit',
    })
});

export default router;