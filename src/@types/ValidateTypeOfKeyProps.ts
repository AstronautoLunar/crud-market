interface ValidateTypeOfKeyProps {
    valueKey: string | number;
    typeKey: typeKeyProps;
}

type typeKeyProps = string;

type ReturnValidateTypeOfKey = ObjectReturn | never;

type ObjectReturn = {
    typeKey: string;
    passedValidateType: boolean;
}

export {
    ValidateTypeOfKeyProps,
    ReturnValidateTypeOfKey
}