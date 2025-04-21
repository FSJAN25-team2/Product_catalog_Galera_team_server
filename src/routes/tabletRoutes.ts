import { Router } from "express";
import { getAllTablets, getTabletById } from "../controllers/tabletControllers";

const router = Router();

router.get("/", getAllTablets);
router.get("/:id", getTabletById);

export default router;