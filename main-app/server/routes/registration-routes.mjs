import express from 'express';

import { registrationController } from '../controllers/registration-controller.mjs';

const router = express.Router();

router.post('/registration', registrationController);

export default router;