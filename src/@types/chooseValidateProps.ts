type ChooseValidateType = string;

interface isValidateProps {
    description: string;
    passed: boolean;
}

interface DataOfChooseValidateProps {
    id: string;
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