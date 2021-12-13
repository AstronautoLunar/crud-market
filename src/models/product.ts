import { 
    IsVerifyProductProps, 
    ReturnFunctionVerifyProducts
} from "../@types";

import { products } from "../data";

function isVerifyProduct({ 
    name, 
    brand, 
    price, 
    shelfLive
}: IsVerifyProductProps): ReturnFunctionVerifyProducts {
    let isNameString = false;
    let isBrandString = false;
    let isPriceNumber = false;
    let isShelfLiveNumber = false;

    function isExistsName() {
        if(name) {
            isNameString = typeof name === "string";
        }
    }
    
    function isExistsBrand() {
        if(brand) {
            isBrandString = typeof brand === "string";
        }
    }

    function isExistsPrice() {
        if(price) {
            isPriceNumber = typeof price === "number";
        }
    }

    function isExistsShelfLive() {
        if(shelfLive) {
            isShelfLiveNumber = typeof shelfLive === "number";
        }
    }

    isExistsName();
    isExistsBrand();
    isExistsPrice();
    isExistsShelfLive();
    
    return {
        isNameString: 
            isNameString 
            ? 
            isNameString 
            : 
            "Não foi incluido o name",

        isBrandString: 
            isBrandString 
            ? 
            isBrandString
            : 
            "Não foi incluido a marca",
        
        isPriceNumber: 
            isPriceNumber 
            ? 
            isPriceNumber 
            : 
            "Não foi incluido o preço",

        isShelfLiveNumber:
            isShelfLiveNumber
            ?
            isShelfLiveNumber
            :
            "Não foi incluido a validação do produto"
    }
}

export const getAllProducts = (request, response) => {
    response.json(JSON.stringify(products));
}

export const sendProduct = (request, response) => {
    const { 
        name, 
        brand, 
        price, 
        shelfLive 
    } = request.body;

    const verify = isVerifyProduct({
        name,
        brand,
        price,
        shelfLive
    })

    console.log(verify);

    response.send("teste");
}