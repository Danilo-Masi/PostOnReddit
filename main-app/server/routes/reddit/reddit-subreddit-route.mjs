import express from 'express';
import { searchSubreddits } from '../../controllers/reddit/reddit-subreddit-controller.mjs';

const router = express.Router();

router.get('/search-subreddits', searchSubreddits);

export default router;