import express from 'express';
import { createPost } from '../../controllers/supabase/create-post-controller.mjs';

const router = express.Router();

router.post('/create-post', createPost);

export default router;