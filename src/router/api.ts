import Express from "express";
import bodyParser from "body-parser";
import { 
    getAllProducts,
    sendProduct,
    modifyProductSpecific,
    modifyProduct,
    deleteProduct
} from "../models/product";

const router = Express.Router();

router.get("/getAllProducts", getAllProducts);

router.post("/sendProduct", 
    bodyParser.json(), sendProduct);

router.put("/modifyProductSpecific/:type", 
    bodyParser.json(), modifyProductSpecific);

router.put("/modifyProduct", 
    bodyParser.json(), modifyProduct);

router.delete("/deleteProduct", 
    bodyParser.json(), deleteProduct);

export default router;