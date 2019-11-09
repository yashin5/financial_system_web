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
        <NavigationContainer>
            <p>{props.email}</p>
            <Logout onClick={logout} href='#'>Logout</Logout>
        </NavigationContainer>
    );
};

export default Header

const Logout = styled.a`
    color: black;
    &:hover{
        color: black;
        opacity: 0.5;
    }
`;

const NavigationContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
`;
