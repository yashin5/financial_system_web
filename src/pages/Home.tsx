import React, {Component} from 'react'
import { Router, Route, Switch } from 'react-router-dom';
import  {Container } from 'reactstrap'
import createBrowserHistory from "../history";
import styled from 'styled-components'
import Login from '../views/Login'
import CreateAccount from '../views/CreateAccount'
import { getCurrenciesService } from '../services/serviceApi'

interface State {
    currencies: Array<string>
};

export default class Home extends Component<{},State>{
    constructor(props){
        super(props);
        this.state = {currencies: [""]}
    };

    componentDidMount(){
        getCurrenciesService()
        .then(res => res.ok? res.json() : console.log(res.statusText))
        .then(res =>  this.setState({ currencies: res.currencies }))
    };

    render(){
        const { currencies } = this.state;

        return(
            <Router history={createBrowserHistory}>
                <Container style={{display: "flex", justifyContent: "center"}}>
                    <DivContainer>
                        <Switch>
                            <Route exact path="/login" component={() => <Login />} />
                            <Route exact path="/create_account" 
                            component={() => <CreateAccount  {...this.props} currencies={currencies} />} 
                            />
                        </Switch>
                    </DivContainer>
                </Container>
            </Router>
        )
    };
};

const DivContainer = styled.div`
    display: flex;
    width: 40%;
    border: 1px solid #cec;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;
    margin-top: 10%;
    box-shadow: 0px 0px 0px 2px #ccc

`;
