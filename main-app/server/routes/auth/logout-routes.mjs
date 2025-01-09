import express from 'express';

import { logoutController } from '../../controllers/auth/logout-controller.mjs';

const router = express.Router();

router.post('/logout', (req, res, next) => {
    console.log("BACKEND: Richiesta ricevuta su /logout");
    next();
}, logoutController);

export default router;