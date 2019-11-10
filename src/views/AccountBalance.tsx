import React from 'react'
import styled from 'styled-components'

interface Props{
    balance: string;
};

const AccountBalance = (props: Props) => {
    return(
            <div style={accountBalanceStyle}>
                <AccountBalanceMessage>Account balance:</AccountBalanceMessage>
                <Balance>{props.balance}</Balance>
            </div>
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
const accountBalanceStyle = {
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-between",
    width: "250px"
}
