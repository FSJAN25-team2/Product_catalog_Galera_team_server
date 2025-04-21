import { Router } from "express";
import { getAllPhones, getPhoneById } from "../controllers/phoneControllers";

const router = Router();

router.get("/", getAllPhones);
router.get("/:id", getPhoneById);

export default router;