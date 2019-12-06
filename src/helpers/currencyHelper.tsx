const formatValueToAPIAccept = (value: string) =>{
    if(value.includes(".")){
        const withoutDot = value.replace(".", "")

        return formatValueToAPIAccept(withoutDot)
    }
    else{
        const withoutComma = value.replace(",", ".")
        return withoutComma
    };
};

export default formatValueToAPIAccept