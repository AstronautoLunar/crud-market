import { 
    IsVerifyProductProps, 
    ReturnFunctionVerifyProducts
} from "../@types";

import { data } from "../data";

function createID():string {
    const randomNumber = Math.random() * 10;
    const valueString = String(randomNumber);
    const ID = valueString.substring(2, valueString.length);

    return ID;
}

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
        } else {
            isBrandString = false;
        }
    }
    
    function isExistsBrand() {
        if(brand) {
            isBrandString = typeof brand === "string";
        } else {
            isBrandString = false;
        }
    }

    function isExistsPrice() {
        if(price) {
            isPriceNumber = typeof price === "number";
        } else {
            isPriceNumber = false;
        }
    }

    function isExistsShelfLive() {
        if(shelfLive) {
            isShelfLiveNumber = typeof shelfLive === "number";
        } else {
            isShelfLiveNumber = false;
        }
    }

    isExistsName();
    isExistsBrand();
    isExistsPrice();
    isExistsShelfLive();
    
    return {
        isNameString,
        isBrandString,
        isPriceNumber,
        isShelfLiveNumber
    }
}

export const getAllProducts = (request, response) => {
    response.json(JSON.stringify(data.products));
}

export const sendProduct = (request, response) => {
    const { 
        name, 
        brand, 
        price, 
        shelfLive 
    } = request.body;

    const {
        isNameString,
        isBrandString,
        isPriceNumber,
        isShelfLiveNumber
    } = isVerifyProduct({
        name,
        brand,
        price,
        shelfLive
    })

    const isNotVerifyToday = 
        !isNameString
        ||
        !isBrandString
        ||
        !isPriceNumber
        ||
        !isShelfLiveNumber;

    if(isNotVerifyToday) {
        response.status(400).send("Tipo de dados invalido");
    } else {
        const newProducts = {
            id: createID(),
            name,
            brand,
            price,
            shelfLive
        }

        data.products.push(newProducts);

        response.status(200).send("Salvo com sucesso");
    }
}