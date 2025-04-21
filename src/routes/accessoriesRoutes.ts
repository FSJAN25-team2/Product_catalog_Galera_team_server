import { Router } from "express";
import { getAllAccessories, getAccessoriesById } from "../controllers/accessoriesControllers";

const router = Router();

router.get("/", getAllAccessories);
router.get("/:id", getAccessoriesById);

export default router;