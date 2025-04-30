import { Router } from "express";
import { getAllProducts, getHotPricedProducts, getProductById } from "../controllers/productsController";

const router = Router();

router.get("/", getAllProducts);
router.get("/hot-prices", getHotPricedProducts);
router.get("/:id", getProductById);

export default router;
