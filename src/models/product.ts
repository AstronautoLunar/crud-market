import { 
    IsVerifyProductProps, 
    ReturnFunctionVerifyProducts,
    ChooseValidateType,
    DataOfChooseValidateProps,
    isValidateProps,
    ValidateTypeOfKeyProps,
    ReturnValidateTypeOfKey
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

function chooseValidate (
    type: ChooseValidateType, 
    data: DataOfChooseValidateProps
): isValidateProps {
    
    const keys = Object.keys(data);
    let isValidate: isValidateProps = {
        description: "O tipo não existe",
        passed: false
    };

    for(let key of keys) {
        if(type === "id") {
            isValidate = {
                description: "Não pode alterar o id",
                passed: false
            }

            break;
        } else if(key === type) {
            isValidate = {
                description: "A propriedade existe pelo qual você esteja tentando enviar",
                passed: true
            }

            break;
        } else {
            isValidate = {
                description: "A propriedade não existe pelo qual você esteja tentando enviar",
                passed: false
            }
        }
    }

    switch(type) {
        case "name":
        case "brand":
        case "price":
        case "shelfLive":
            return isValidate;
        default:
            return isValidate;
    }
}

function validateTypeOfKey({ 
    typeKey, 
    valueKey 
}: ValidateTypeOfKeyProps): ReturnValidateTypeOfKey {
    switch(typeKey) {
        case "name":
        case "brand":
            return {
                typeKey: "string",
                passedValidateType: typeof valueKey === "string"

            };
        
        case "price":
        case "shelfLive":
            return {
                typeKey: "number",
                passedValidateType: typeof valueKey === "number"
            };

        default:
            throw new Error("Invalidate Type");
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

export const modifyProduct = (request, response) => {
    const { type } = request.params;
    const data = request.body;

    const { description, passed } = chooseValidate(type, data);

    if(!passed) {
        response.status(400).send(description);
    } else {
        const valueKeyOfData = data[type];

        const { passedValidateType, typeKey } = validateTypeOfKey({ 
            valueKey: valueKeyOfData, 
            typeKey: type
        });

        if(!passedValidateType) {
            response.status(400).send(`O valor que está tentando enviar para alteração não é do tipo ${ typeKey }`)
        } else {
            response.send("test");
        }
    }
}