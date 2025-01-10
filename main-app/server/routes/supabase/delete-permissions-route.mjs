import express from 'express';
import { deletePermissions } from '../../controllers/supabase/delete-permissions-controller.mjs';

const router = express.Router();

router.delete('/delete-permissions', deletePermissions);

export default router;