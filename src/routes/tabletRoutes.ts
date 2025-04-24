import { Router } from "express";
import { getTabletById } from "../controllers/tabletControllers";

const router = Router();

router.get("/:id", getTabletById);

export default router;
