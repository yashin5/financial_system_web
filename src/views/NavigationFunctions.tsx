import React from 'react'
import { Container } from 'reactstrap'
import Navigation from '../components/Navigation'
import nav from '../nav'

const NavigationFunctions = () => {
    return(
        <div>
            <Navigation navigation={nav} />
        </div>
    );
};

export default NavigationFunctions