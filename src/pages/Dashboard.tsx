import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap'
import Header from '../views/Header'
import NavigationFunctions from '../views/NavigationFunctions'
import AccountBalance from '../views/AccountBalance'
import Withdraw from '../views/Withdraw'
import Deposit from '../views/Deposit'


interface State{
    email: string,
    balance: string,
    currencies: Array<string>,
};

interface Props{

};

export default class Dashboard extends Component<Props,State>{
    constructor(props: State){
        super(props);
        this.state = {email: "", balance: "", currencies: []}
    };

    componentDidMount = () =>{
        this.setState({email: "ysantos@stone.com.br", balance: "10.000221", currencies: ["BRL"]})
    };

    balance = (new_balance: string) => {
        this.setState({balance: new_balance})
    };

    render(){
        const { email, balance, currencies} = this.state

        return(
            <BrowserRouter>
                <Container>
                    <Header email={email}/>    
                    <NavigationFunctions/>     
                    <AccountBalance balance={balance} />           
                        <Switch>
                            <Route exact path="/withdraw" component={() => <Withdraw new_balance={this.balance}/>} />
                            <Route exact path="/deposit" component={() => <Deposit currencies={currencies} new_balance={this.balance}/>} />
                        </Switch>                    
                </Container>
            </BrowserRouter>
        )
    }        
}