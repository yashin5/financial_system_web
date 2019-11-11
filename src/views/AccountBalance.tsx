import React from 'react'
import {Col, Row} from 'reactstrap'
import styled from 'styled-components'

interface Props{
    balance: string;
};

const AccountBalance = (props: Props) => {
    return(
        <AccountBalanceContainer>
            <Row >
                <Col md="1.1">
                    <AccountBalanceMessage>Account balance:</AccountBalanceMessage>
                </Col>
                <Col md="6">
                    <Balance>{props.balance}</Balance>
                </Col>
            </Row>
        </AccountBalanceContainer>
    );
};

export default AccountBalance

const AccountBalanceContainer = styled.div`
    margin-top: 15px;
`;

const AccountBalanceMessage = styled.p`
    font-size: 1rem;
    color: black
`;

const Balance = styled.p`
    font-size: 1rem;
    color: green
`;
