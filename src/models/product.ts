import { 
    IsVerifyProductProps, 
    ReturnFunctionVerifyProducts,
    ChooseValidateType,
    DataOfChooseValidateProps,
    isValidateProps,
    ValidateTypeOfKeyProps,
    ReturnValidateTypeOfKey,
    ModifyEspecificProductProps,
    ValidateFullBodyProps,
    ReturnValidateFullBody,
    ModifyBodyFunctionProps
} from "../@types";

import express from 'express';

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

function validateFullBody({ 
    id, 
    name, 
    brand, 
    price, 
    shelfLive 
}: ValidateFullBodyProps):ReturnValidateFullBody {
    let messageError: string = "Passou da validação";

    function setError({ conditional, message }) {
        if(!conditional) {
            messageError = message;
        }
    }

    const isIdString = typeof id === "string";
    const isNameString = typeof name === "string";
    const isBrandString = typeof brand === "string";
    const isPriceNumber = typeof price === "number";
    const isShelfLiveNumber = typeof shelfLive === "number";
    const isTodayValidate = 
        isIdString 
        && 
        isNameString 
        && 
        isBrandString
        && 
        isPriceNumber 
        && 
        isShelfLiveNumber;
    
    setError({
        conditional: isIdString,
        message: "A propriedade 'id' que você está tentando modificar não é do tipo caracteres ou não existe"
    });

    setError({
        conditional: isNameString,
        message: "A propriedade 'name' que você está tentando modificar não é do tipo caracteres ou não existe"
    });

    setError({
        conditional: isBrandString,
        message: "A propriedade 'brand' que você está tentando modificar não é do tipo caracteres ou não existe"
    });

    setError({
        conditional: isPriceNumber,
        message: "A propriedade 'price' que você está tentando modificar não é do tipo número ou não existe"
    });
    
    setError({
        conditional: isShelfLiveNumber,
        message: "A propriedade 'shelfLive' que você está tentando modificar não é do tipo número"
    });

    return {
        messageError,
        passed: isTodayValidate
    };
}

export const getAllProducts = (
        request: express.Request, 
        response: express.Response
) => {
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

export const modifyProductSpecific = (
    request: express.Request, 
    response: express.Response
) => {
    const { type } = request.params;
    const body = request.body;

    const { description, passed } = chooseValidate(type, body);

    if(!passed) {
        response.status(400).send(description);
    } else {
        const valueKeyOfData = body[type];

        const { passedValidateType, typeKey } = validateTypeOfKey({ 
            valueKey: valueKeyOfData, 
            typeKey: type
        });

        if(!passedValidateType) {
            response.status(400).send(`O valor que está tentando enviar para alteração não é do tipo ${ typeKey }`)
        } else {
            

            let index = data.products.findIndex(item => item.id === body.id);
            
            function modifyEspecificProduct({ 
                typeKey, 
                value 
            }:ModifyEspecificProductProps) {
                data.products[index] = { ...data.products[index], [typeKey]: value }
            }
            
            function responseSuccessModify(value: string) {
                response.status(200).send(`Alterado ${value} do produto com sucesso`);
            }

            switch(type) {
                case "name":
                    modifyEspecificProduct({
                        typeKey: "name",
                        value: body.name
                    });
                    responseSuccessModify("Nome");
                    
                    break;
                case "brand":
                    modifyEspecificProduct({
                        typeKey: "brand",
                        value: body.brand
                    });
                    responseSuccessModify("Marca");

                    break;
                case "price":
                    modifyEspecificProduct({
                        typeKey: "price",
                        value: body.price
                    });
                    responseSuccessModify("Preço");

                    break;
                case "shelfLive":
                    modifyEspecificProduct({
                        typeKey: "shelfLive",
                        value: body.shelfLive
                    });
                    responseSuccessModify("Vida Util");

                    break;
                default:
                    response.status(500).send("Não foi possivel fazer a modificação do objeto, tipo invalido");
            }
        }
    }
}

export const modifyProduct = (
    request: express.Request, 
    response: express.Response
) => {
    const { 
        id, 
        name, 
        brand, 
        price, 
        shelfLive 
    } = request.body;

    const { 
        messageError, 
        passed 
    } = validateFullBody({
        id,
        name,
        brand,
        price,
        shelfLive
    });

    function modifyBody(index: number, {
        name,
        brand,
        price,
        shelfLive
    }: ModifyBodyFunctionProps) {
        data.products[index] = { 
            ...data.products[index], 
            name,
            brand,
            price,
            shelfLive
        };
    }

    if(!passed) {
        response.status(400).send(messageError);
    } else {
        const index = data.products.findIndex(item => item.id === id);

        modifyBody(
            index,
            {
                name,
                brand,
                price,
                shelfLive
            }
        );

        response.status(200).send("Alteração feita com sucesso");
    }
}

export const deleteProduct = (
    request: express.Request, 
    response: express.Response
) => {
    const { id } = request.body;

    const isIdString = typeof id === "string";

    if(!isIdString) {
        response.status(400).send("O id não é do tipo texto");
    } else {
        response.send("test");
    }
}