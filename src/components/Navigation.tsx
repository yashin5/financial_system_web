import React from 'react'
import { Container } from 'reactstrap'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'

interface NavigationItem{
    label: string,
    path: string,
}

interface Props{
    navigation: Array<NavigationItem>
}

const Navigation = (props: Props) => {
    return (
        <NavigationContainer>
            {props.navigation.map((navigationItem: NavigationItem) =>(
                <NavLinkStyled to={navigationItem.path}>{navigationItem.label}</NavLinkStyled>
            ))}
        </NavigationContainer>
    )
}

export default Navigation

const NavLinkStyled = styled(NavLink)`
    padding-top: 15px;
    color: #616161;
    &:hover{
        color: black;
    }
`;

const NavigationContainer = styled(Container)`
    display: flex;
    justify-content: space-around;
`;