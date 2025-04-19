import { Router } from "express";
import { getAllPhones, getPhoneById } from "../controllers/phoneController";

const router = Router();

router.get("/phones", getAllPhones);
router.get("/phones/:id", getPhoneById);

export default router;