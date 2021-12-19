interface ValidateFullBodyProps {
    id: string;
    name: string;
    brand: string;
    price: number;
    shelfLive: number;
}

type ReturnValidateFullBody = {
    messageError: string;
    passed: boolean;

}

export {
    ValidateFullBodyProps,
    ReturnValidateFullBody
};