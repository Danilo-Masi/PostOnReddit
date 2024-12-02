import express from 'express';
import { searchFlair } from '../../controllers/reddit/reddit-flair-controller.mjs';

const router = express.Router();

router.get('/search-flair', searchFlair);

export default router;