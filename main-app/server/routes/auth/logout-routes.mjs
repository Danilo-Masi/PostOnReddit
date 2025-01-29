import express from 'express';
import { logoutController } from '../../controllers/auth/logout-controller.mjs';

const router = express.Router();

router.post('/logout', logoutController);


export default router;