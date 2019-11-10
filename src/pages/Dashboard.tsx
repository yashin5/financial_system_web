import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap'
import Header from '../views/Header'
import NavigationFunctions from '../views/NavigationFunctions'
import AccountBalance from '../views/AccountBalance'
import Withdraw from '../views/Withdraw'


interface State{
    email: string,
    balance: string,
};

interface Props{

};

export default class Dashboard extends Component<Props,State>{
    constructor(props: State){
        super(props);
        this.state = {email: "ysantos@stone.com.br", balance: "10.000221"}
    };

    render(){
        const { email, balance} = this.state

        return(
            <BrowserRouter>
                <Container>
                    <Header email={email}/>    
                    <NavigationFunctions/>     
                    <AccountBalance balance={balance} />           
                        <Switch>
                            <Route exact path="/withdraw" component={Withdraw} />
                        </Switch>                    
                </Container>
            </BrowserRouter>
        )
    }        
}