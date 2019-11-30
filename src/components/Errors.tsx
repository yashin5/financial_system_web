import React from 'react'
import styled from 'styled-components'


interface Error {
    error: string
};

interface Props {
    errors: Array<Error> | string
};

const Errors = (props) => {
    const { errors } = props;
    const errorInArray = Array.isArray(errors)? errors : [ errors ];
    const verifyIsObject = typeof(errorInArray[0]) === typeof({})?
        errorInArray[0] : errorInArray;
    const errorNames = Object.keys(verifyIsObject);
    const Formatederrors = errorNames.map(error => verifyIsObject[error]);    
    console.log(errors)
    return (
        <ErrorsDiv>
            {
                errors && Formatederrors.map(error => 
                    <SpanStyled key={error}>{error}</SpanStyled>
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
    margin-top: 15px;
`;

const SpanStyled = styled.span`
    font-size: 0.6rem;
    color: red
`;