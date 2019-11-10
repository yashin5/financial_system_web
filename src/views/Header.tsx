import React from 'react'
import { Container } from 'reactstrap'
import styled from 'styled-components'

interface Props{
    history?: any,
    email: string
};

const Header = (props: Props) =>{
    const logout = () =>{
        props.history.push("/login")
    };

    return (
        <HeaderContainer>
            <p>{props.email}</p>
            <Logout onClick={logout} href='#'>Logout</Logout>
        </HeaderContainer>
    );
};

export default Header

const Logout = styled.a`
    color: black;
    &:hover{
        color: #c6c6c6;
        opacity: 0.5;
    }
`;

const HeaderContainer = styled(Container)`
    margin-top: 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px solid black;
`;
