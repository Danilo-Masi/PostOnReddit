import express from 'express';

import { loginController } from '../controllers/login-controller.mjs';

const router = express.Router();

router.post('/login', loginController);

export default router;