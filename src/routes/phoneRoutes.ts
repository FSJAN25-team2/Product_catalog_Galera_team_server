import { Router } from "express";
import { getAllPhones, getPhoneById } from "../controllers/phoneController";

const router = Router();

router.get("/", getAllPhones);
router.get("/:id", getPhoneById);

export default router;