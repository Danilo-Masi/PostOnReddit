import express from "express";
import { handleSuccessCallback } from "../../controllers/payment/creem-checkout-controller.mjs";

const router = express.Router();

router.get("/success", handleSuccessCallback);

export default router;