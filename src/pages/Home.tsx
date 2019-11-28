import React, {Component} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  {Container } from 'reactstrap'
import styled from 'styled-components'
import Login from '../views/Login'

export default class Home extends Component<{},{}>{
    render(){
        return(
            <BrowserRouter>
                <Container style={{display: "flex", justifyContent: "center"}}>
                    <DivContainer>
                        <Switch>
                            <Route exact path="/login" component={() => <Login />} />
                        </Switch>
                    </DivContainer>
                </Container>
            </BrowserRouter>
        )
    }
};

const DivContainer = styled.div`
    display: flex;
    width: 30%;
    border: 1px solid #cec;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;
    margin-top: 10%;
    box-shadow: 0px 0px 0px 2px #ccc

`
