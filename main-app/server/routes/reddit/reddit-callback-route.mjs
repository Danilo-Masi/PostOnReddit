import express from 'express';
import { redditCallback } from '../../controllers/reddit/reddit-callback-controller.mjs';

const router = express.Router();

router.get('/reddit-callback', redditCallback);

export default router;