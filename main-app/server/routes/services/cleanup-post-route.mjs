import express from 'express';
import { deletePostedPosts } from '../../controllers/services/cleanupPost.mjs';

const router = express.Router();

router.get('/run-cron-cleanup', async (req, res) => {
    await deletePostedPosts();
    res.json({
        success: true,
        message: 'Job eseguito: pulizia dei post',
    })
});

export default router;