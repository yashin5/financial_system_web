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
import { getBalanceService, getCurrenciesService, getAllContactsService} from '../services/serviceApi'


interface Contact {
    contact_nickname: string,
    contact_email: string,
};

interface State{
    email: string,
    balance: string,
    currencies: Array<string>,
    contact_list: Array<Contact>,
    currency_precision: number,
    currency: string,
};

interface Props{

};

export default class Dashboard extends Component<Props,State>{
    constructor(props: State){
        super(props);
        this.state = {
            email: "...",
            balance: "",
            currencies: [],
            contact_list:[],
            currency: "",
            currency_precision: 0
        };
    };

    componentDidMount = () =>{
        getBalanceService()
        .then(res => res.ok? res.json() : console.log(res.statusText))
        .then(res => this.setState({
            email: res.email,
            currency_precision: res.value_in_account.currency_precision,
            balance: res.value_in_account.value,
            currency: res.value_in_account.currency
        }));

        getCurrenciesService()
        .then(res => res.ok? res.json() : console.log(res.statusText))
        .then(res => this.setState({currencies: res.currencies}));

        getAllContactsService()
        .then(res => res.ok? res.json() : console.log(res.statusText))
        .then(res => this.setState({contact_list: res}));
    };

    balance = (new_balance: string) => {
        this.setState({balance: new_balance});
    };

    createNewContact = (new_contact: Contact) => {
        const { contact_list } = this.state;
        const verify_if_contact_already_exist = contact_list.filter(contact => (
            contact.contact_email !== new_contact.contact_email
        ));

        const new_contact_list = [...verify_if_contact_already_exist, new_contact];
            
        this.setState({contact_list: new_contact_list});
    };

    render(){
        const { currency_precision, email, balance, currencies, contact_list, currency} = this.state

        return(
            <BrowserRouter>
                <Container>
                    <Header email={email}/>    
                    <NavigationFunctions/>     
                    <AccountBalance balance={balance} currency={currency}/>  
                        <Switch>
                            <Route exact path="/withdraw" component={() => <Withdraw currency_precision={currency_precision} new_balance={this.balance}/>} />
                            <Route exact path="/deposit" component={() => <Deposit currency_precision={currency_precision} currencies={currencies} new_balance={this.balance}/>} />
                            <Route exact path="/transfer" component={() => <Transfer currency_precision={currency_precision} new_balance={this.balance}/>} />
                            <Route exact path="/split" component={() => <Split  currency_precision={currency_precision} new_balance={this.balance}/>} />
                            <Route exact path="/contacts" component={() => <AddContact create_contact={this.createNewContact} contact_list={contact_list} />} />
                        </Switch>
                </Container>
            </BrowserRouter>
        );
    };   
};