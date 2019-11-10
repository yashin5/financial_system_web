import React from 'react'
import {Col, Row} from 'reactstrap'
import styled from 'styled-components'

interface Props{
    balance: string;
};

const AccountBalance = (props: Props) => {
    return(
            <Row >
                <Col md="1.1">
                    <AccountBalanceMessage>Account balance:</AccountBalanceMessage>
                </Col>
                <Col md="6">
                    <Balance>{props.balance}</Balance>
                </Col>
            </Row>
    );
};

export default AccountBalance

const AccountBalanceMessage = styled.p`
    font-size: 1rem;
    color: black
`
const Balance = styled.p`
    font-size: 1rem;
    color: green
`