
export const validateFormHelper = (callbackButton: Function, fields: Object) => {
    const fieldNames = Object.keys(fields);
    const fieldsWithoutError = fieldNames.filter(fieldName => fields[fieldName] !== "" && fields[fieldName] !== "0" && fields[fieldName] !== "NaN" );    
    if(fieldsWithoutError.length === fieldNames.length){    
        return callbackButton(false);
    };    
    
    return callbackButton(true);
};

export const formatValueToValidate = (value: string) =>{
    const valueInFloatFormat = value.replace(",",".");
    const valueToFloat = parseFloat(valueInFloatFormat);
    const valueToString = `${valueToFloat}`;

    return valueToString;
};