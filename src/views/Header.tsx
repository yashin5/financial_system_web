import React from 'react'
import styled from 'styled-components'
import createBrowserHistory from '../history'

interface Props{    
    email: string
};

const Header = (props: Props) =>{
    const logout = () =>{
        localStorage.clear();
        createBrowserHistory.push("/login");
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

const HeaderContainer = styled.div`
    margin-top: 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px solid black;
`;
