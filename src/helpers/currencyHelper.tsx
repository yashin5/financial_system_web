const formatValueToAPIAccept = (value: string) =>{
    if(value.includes(".")){
        const whitoutDot = value.replace(".", "")

        return formatValueToAPIAccept(whitoutDot)
    }
    else{
        const whitoutComma = value.replace(",", ".")
        return whitoutComma
    };
};

export default formatValueToAPIAccept