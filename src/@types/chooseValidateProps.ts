type ChooseValidateType = 
    "name" 
    | 
    "brand" 
    | 
    "price" 
    | 
    "shelfLive";

interface isValidateProps {
    description: string;
    passed: boolean;
}

interface DataOfChooseValidateProps {
    name: string;
    brand: string;
    price: number;
    shelfLive: number;
}

export {
    ChooseValidateType,
    DataOfChooseValidateProps,
    isValidateProps
}