import Express from "express";
import bodyParser from "body-parser";
import { 
    getAllProducts,
    sendProduct,
    modifyProduct
} from "../models/product";

const router = Express.Router();

router.get("/getAllProducts", getAllProducts);

router.post("/sendProduct", 
    bodyParser.json(), sendProduct);

router.put("/modifyProduct/:type", 
    bodyParser.json(), modifyProduct);

export default router;