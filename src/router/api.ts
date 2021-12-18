import Express from "express";
import bodyParser from "body-parser";
import { 
    getAllProducts,
    sendProduct,
    modifyProductSpecific,
    modifyProduct
} from "../models/product";

const router = Express.Router();

router.get("/getAllProducts", getAllProducts);

router.post("/sendProduct", 
    bodyParser.json(), sendProduct);

router.put("/modifyProductSpecific/:type", 
    bodyParser.json(), modifyProductSpecific);

router.put("/modifyProduct", 
    bodyParser.json(), modifyProduct);

export default router;