import express from 'express';
import { checkRedditAuthorization } from '../../controllers/supabase/verify-reddit-controller.mjs';

const router = express.Router();

router.get('/check-reddit-authorization', checkRedditAuthorization);

export default router;