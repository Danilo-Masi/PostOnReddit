import express from 'express';
import { checkPlan } from '../../controllers/supabase/check-plan-controller.mjs';

const router = express.Router();

router.get('/check-plan', checkPlan);

export default router;