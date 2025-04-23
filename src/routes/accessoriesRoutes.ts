import { Router } from "express";
import { getAccessoriesById } from "../controllers/accessoriesControllers";

const router = Router();

router.get("/:id", getAccessoriesById);

export default router;