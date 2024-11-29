import express from 'express';

import { loginController } from '../../controllers/auth/login-controller.mjs';

const router = express.Router();

router.post('/login', loginController);

export default router;