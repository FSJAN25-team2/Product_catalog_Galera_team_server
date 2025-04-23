import { Router } from "express";
import { getAllProducts, getHotPricedProducts } from "../controllers/productsController";

const router = Router();

router.get("/", getAllProducts);
router.get("/hot-prices", getHotPricedProducts);

export default router;