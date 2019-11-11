import React from 'react'
import { Container } from 'reactstrap'
import Navigation from '../components/Navigation'
import nav from '../nav'

const NavigationFunctions = () => {
    return(
        <Container>
            <Navigation navigation={nav} />
        </Container>
    );
};

export default NavigationFunctions