import express from 'express';
import { verifyToken } from '../../controllers/supabase/verify-token-controller.mjs';

const router = express.Router();

router.get('/verify-token', (req, res, next) => {
    next();
}, verifyToken, (req, res) => {
    res.status(200).json({
        message: 'Valid Token',
        user: req.user,
    });
});

export default router;