import express from "express";
import { createCheckoutSession } from "../../controllers/payment/creem-checkout-controller.mjs";

const router = express.Router();

router.post("/checkout", createCheckoutSession);

export default router;