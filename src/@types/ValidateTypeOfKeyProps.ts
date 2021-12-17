interface ValidateTypeOfKeyProps {
    valueKey: string | number;
    typeKey: typeKeyProps;
}

type typeKeyProps = 
"name" | "brand" | "price" | "shelfLive";

type ReturnValidateTypeOfKey = ObjectReturn | never;

type ObjectReturn = {
    typeKey: string;
    passedValidateType: boolean;
}

export {
    ValidateTypeOfKeyProps,
    ReturnValidateTypeOfKey
}