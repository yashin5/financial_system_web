import React from 'react'
import styled from 'styled-components'

interface Props {
    header: string,
};

const HeaderFunction = (props: Props) => {
    return(
        <HeaderFunctions>
            <h1>{props.header}</h1>
        </HeaderFunctions>
    );
};

export default HeaderFunction

const HeaderFunctions = styled.div`
    margin-top: 5px;
    display: flex;
    margin-bottom: 25px;
    align-items: center;
    justify-content: center;
    width: 530px ;
`;