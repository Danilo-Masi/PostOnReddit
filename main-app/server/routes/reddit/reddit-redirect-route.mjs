import express from 'express';
import { redditRedirect } from '../../controllers/reddit/reddit-redirect-controller.mjs';

const router = express.Router();

router.get('/reddit-redirect', redditRedirect);

export default router;