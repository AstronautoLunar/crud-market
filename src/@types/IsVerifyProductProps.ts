interface IsVerifyProductProps {
    name?: string;
    brand?: string;
    price?: number;
    shelfLive?: number;
}

export type ReturnFunctionVerifyProducts = { 
    isNameString: boolean;
    isBrandString: boolean;
    isPriceNumber: boolean;
    isShelfLiveNumber: boolean;
};

export default IsVerifyProductProps;