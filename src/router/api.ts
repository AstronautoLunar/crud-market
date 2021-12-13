import Express from "express";
import bodyParser from "body-parser";
import { 
    getAllProducts,
    sendProduct
} from "../models/product";

const router = Express.Router();

router.get("/getAllProducts", getAllProducts);
router.post("/sendProduct", 
    bodyParser.json(), sendProduct);

export default router;