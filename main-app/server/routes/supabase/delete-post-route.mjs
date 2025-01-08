import express from 'express';
import { deletePost } from '../../controllers/supabase/delete-post-controller.mjs';

const router = express.Router();

router.post('/delete-post', deletePost);

export default router;