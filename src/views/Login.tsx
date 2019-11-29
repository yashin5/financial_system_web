import React, { Component, ChangeEvent, FormEvent } from 'react'
import { NavLink } from 'react-router-dom';
import { Col, Form } from 'reactstrap'
import styled from 'styled-components'
import Buttons from '../components/Buttons'
import Forms from '../components/Forms'
import { validateFormHelper } from '../helpers/validateFormHelper'
import { authenticateService, validateTokenService } from '../services/serviceApi'
import createBrowserHistory from '../history'


interface State {
    email: string,
    password: string,
    buttonLoad: boolean,
    errors: Array<string>,
};

interface Props{

};

export default class Login extends Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {            
            email: "",
            password: "",
            buttonLoad: true,
            errors: [""]
        };
    };

    buttonload = (buttonLoad: boolean) => (this.setState({ buttonLoad }));

    email = (event: ChangeEvent<HTMLInputElement>) => {
        const { password } = this.state;
        const email = event.target.value;
        const validateInputs = { email, password };

        this.setState({ email });

        validateFormHelper(this.buttonload, validateInputs);  
    };

    password = (event: ChangeEvent<HTMLInputElement>) => {
        const { email } = this.state;
        const password = event.target.value;
        const validateInputs = { password, email };

        this.setState({ password });

        validateFormHelper(this.buttonload, validateInputs);  
    };

    doLogin = (event: FormEvent) => {
        event.preventDefault();
        const { email, password } = this.state;
        this.setState({ buttonLoad: true }, () => 
            authenticateService( email, password )
            .then(res => res.json())
            .then(res => {
                if(res.error){
                    const errorNames = Object.keys(res.error)
                    const errors = errorNames.map(error => res.error[error])
                    this.setState({ errors })
                }
                else{
                    localStorage.setItem("token", res.token);
                    validateTokenService().then(res => res.json())
                    .then(res => {
                        console.log(res)
                        if(res.error){                            
                            const errorNames = Object.keys(res.error)
                            const errors = errorNames.map(error => res.error[error])
                            this.setState({ errors })                            
                        }
                        else{
                            createBrowserHistory.push("/home")
                        }
                    })                    
                }                
            })
        )
    }

    render(){
        const { errors, email, password, buttonLoad} = this.state
        const formOne = [{
            label: "Email",
            value: email,
            onChange: this.email,
            type: "email"
        }];

        const formTwo = [{
                label: "Password",
                value: password,
                onChange: this.password,
                type: "password"
        }];

        return(
            <div>
                <HeaderStyled>Login</HeaderStyled>
                <Form onSubmit={this.doLogin}>
                    <Col md="12">
                        <Forms forms={formOne} />
                        <Forms forms={formTwo} />
                    </Col>

                    <ButtonContainer>
                        <Buttons style={buttonStyle} buttonLoad={buttonLoad} type="submit" color="success" size="sm" value="Login!"/>
                        <ErrorsDiv>
                            {
                                errors && errors.map(error => 
                                    <SpanStyled>{error}</SpanStyled>
                                )
                            }
                        </ErrorsDiv>
                        <NavLinkStyled to="/create_account">dont have an account? click here!</NavLinkStyled>
                    </ButtonContainer>
                </Form>            
            </div>
        )
    }
};

const ErrorsDiv = styled.div`
    display: flex;
    flex-direction: row
`
const SpanStyled = styled.span`
    font-size: 0.6rem;
    color: red
`;

const buttonStyle = {width: "230px"}

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 530px ;
`;

const NavLinkStyled = styled(NavLink)`
    width: inherit;
    text-align: center;
    margin-top: 25px;
    margin-bottom: 25px;
    font-size: 0.7rem;
`;

const HeaderStyled = styled.h1`
    text-align: center;
    font-size: 1.5rem;
    margin-top: 25px
`