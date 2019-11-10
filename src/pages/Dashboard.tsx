import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap'
import Header from '../views/Header'
import NavigationFunctions from '../views/NavigationFunctions'

interface State{
    email: string,
};

interface Props{

};

export default class Dashboard extends Component<Props,State>{
    constructor(props: State){
        super(props);
        this.state = {email: ""}
    };

    render(){
        return(
            <BrowserRouter>
                <Container>
                    <Header email={"ysantos@stone.com.br"}/>    
                    <NavigationFunctions/>                
                        <Switch>
                            {/* <Route exact path="/candidatos" component={Candidates} /> */}
                        </Switch>                    
                </Container>
            </BrowserRouter>
        )
    }        
}