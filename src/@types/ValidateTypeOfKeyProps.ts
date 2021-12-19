interface ValidateTypeOfKeyProps {
    valueKey: string | number;
    typeKey: string;
}

type ReturnValidateTypeOfKey = {
    typeKey: string;
    passedValidateType: boolean;
    messageError: string,
}

export {
    ValidateTypeOfKeyProps,
    ReturnValidateTypeOfKey
}