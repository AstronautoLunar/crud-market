import Express from "express";
import { getAllProducts } from "../models/product";

const router = Express.Router();

router.get("/getAllProducts", getAllProducts);

export default router;