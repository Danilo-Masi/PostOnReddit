import express from 'express';
import { retrievePosts } from '../../controllers/supabase/retrieve-posts-controller.mjs';

const router = express.Router();

router.get('/retrieve-posts', retrievePosts);

export default router;