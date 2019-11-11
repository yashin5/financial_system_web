import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap'
import Header from '../views/Header'
import NavigationFunctions from '../views/NavigationFunctions'
import AccountBalance from '../views/AccountBalance'
import Withdraw from '../views/Withdraw'
import Deposit from '../views/Deposit'
import Transfer from '../views/Transfer'
import Split from '../views/Split'
import AddContact from '../views/AddContact';


interface Contact {
    nickname: string,
    email: string,
};

interface State{
    email: string,
    balance: string,
    currencies: Array<string>,
    contact_list: Array<Contact>
};

interface Props{

};

export default class Dashboard extends Component<Props,State>{
    constructor(props: State){
        super(props);
        this.state = {
            email: "",
            balance: "",
            currencies: [],
            contact_list:[]
        };
    };

    componentDidMount = () =>{
        this.setState({
            email: "ysantos@stone.com.br",
            balance: "10.000221",
            currencies: ["BRL"],
            contact_list: [{
                nickname: "Yashin Sants",
                email: "ysantos@gmail.com",
            }]
        });
    };

    balance = (new_balance: string) => {
        this.setState({balance: new_balance});
    };

    createNewContact = (new_contact: Contact) => {
        const { contact_list } = this.state;
        const verify_if_contact_already_exist = contact_list.filter(contact => (
            contact.email !== new_contact.email
        ));
        const new_contact_list = [...verify_if_contact_already_exist, new_contact];
        
        this.setState({contact_list: new_contact_list});
    };

    render(){
        const { email, balance, currencies, contact_list} = this.state

        return(
            <BrowserRouter>
                <Container>
                    <Header email={email}/>    
                    <NavigationFunctions/>     
                    <AccountBalance balance={balance} />  
                        <Switch>
                            <Route exact path="/withdraw" component={() => <Withdraw new_balance={this.balance}/>} />
                            <Route exact path="/deposit" component={() => <Deposit currencies={currencies} new_balance={this.balance}/>} />
                            <Route exact path="/transfer" component={() => <Transfer new_balance={this.balance}/>} />
                            <Route exact path="/split" component={() => <Split  new_balance={this.balance}/>} />
                            <Route exact path="/contacts" component={() => <AddContact create_contact={this.createNewContact} contact_list={contact_list} />} />
                        </Switch>
                </Container>
            </BrowserRouter>
        );
    };   
};