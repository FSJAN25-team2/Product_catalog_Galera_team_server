import { Router } from "express";
import { getPhoneById } from "../controllers/phoneControllers";

const router = Router();

router.get("/:id", getPhoneById);

export default router;