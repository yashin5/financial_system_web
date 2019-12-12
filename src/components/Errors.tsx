import React from 'react'
import styled from 'styled-components'


interface Props {
    errors: Array<string> | string
};

const errorsToTheUser = (key: string) => {
    console.log(key)
    const errorsMaped = {
        "do_not_have_funds": "Do not have the necessary funds.",
        "value_is_too_low_to_convert_to_the_currency": "Value is to low to convert.",
        "user_dont_exist": "User not found.",
        "cannot_send_to_the_same": "Cannot transfer to yourself.",
        "should be at least 6 character(s)": "Password: should be at least 6 characters",
        "should be at least 2 character(s)": "Name: should be at least 2 characters"
    }[key];

    if(errorsMaped === undefined && key !== ""){
        return "Unexpected error"
    }
    else{
        return errorsMaped
    };
};

const Errors = (props: Props) => {
    const { errors } = props;
    const errorInArray = Array.isArray(errors)? errors : [ errors ];
    const verifyIsObject = typeof(errorInArray[0]) === typeof({})?
        errorInArray[0] : errorInArray;
    const errorNames = Object.keys(verifyIsObject);
    const Formatederrors = errorNames.map(error => verifyIsObject[error]);    
    return (
        <ErrorsDiv>
            {
                errors && Formatederrors.map(error => 
                    <div>
                        <SpanStyled key={error}>{errorsToTheUser(error)}</SpanStyled>
                    </div>
                )
            }
        </ErrorsDiv>
    );
};

export default Errors;

const ErrorsDiv = styled.div`
    width: inherit;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
`;

const SpanStyled = styled.span`
    font-size: 0.6rem;
    color: red
`;