import { 
    IsVerifyProductProps, 
    ReturnFunctionVerifyProducts,
    ChooseValidateType,
    DataOfChooseValidateProps,
    isValidateProps
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

//

function chooseValidate (
    type: ChooseValidateType, 
    data: DataOfChooseValidateProps
): isValidateProps {
    const keys = Object.keys(data);
    let isValidate: isValidateProps = {
        description: "Não passou da validação",
        passed: false
    };

    function isTypeValidate(callback) {
        let error = "";

        for(let key of keys) {
            if(key === type) {
                error = "O tipo existe nas propriedades do json";

                callback(error);

                return true;
            } else {
                error = "O tipo não existe nas propriedades do json";

                callback(error);

                return false;
            }
        }
    } 

    switch(type) {
        case "name":
        case "brand":
        case "price":
        case "shelfLive":
            isTypeValidate((error: string) => {
                if(error) {
                    isValidate = {
                        description: error,
                        passed: false
                    };
                } else {
                    isValidate = {
                        description: error,
                        passed: true
                    };
                }
            });
            break;
        default:
            return isValidate;
    }
}

//

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

export const modifyProduct = (request, response) => {
    const { type } = request.params;
    const data = request.body;

    chooseValidate(type, data);

    response.send("test");
}