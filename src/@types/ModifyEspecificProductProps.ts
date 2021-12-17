interface ModifyEspecificProductProps {
    typeKey: TypeKeyProps;
    value: ValueProps;
}

type TypeKeyProps = 
    "name" 
    | 
    "brand" 
    | 
    "price" 
    | 
    "shelfLive";

type ValueProps = string | number;

export default ModifyEspecificProductProps;