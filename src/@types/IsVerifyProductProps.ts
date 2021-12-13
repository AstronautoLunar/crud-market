interface IsVerifyProductProps {
    name?: string;
    brand?: string;
    price?: number;
    shelfLive?: number;
}

export type ReturnFunctionVerifyProducts = { 
    isNameString: boolean | string;
    isBrandString: boolean | string;
    isPriceNumber: boolean | string;
    isShelfLiveNumber: boolean | string;
};

export default IsVerifyProductProps;