import express from 'express';
import { retrieveData } from '../../controllers/supabase/retrieve-data-controller.mjs';

const router = express.Router();

router.get('/retrieve-data', retrieveData);

export default router;