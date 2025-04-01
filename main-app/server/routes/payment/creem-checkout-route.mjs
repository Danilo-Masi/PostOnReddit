import express from "express";
import { getRedirectUrl } from "../../controllers/payment/creem-checkout-controller.mjs";

const router = express.Router();

router.post("/checkout", getRedirectUrl);

export default router;