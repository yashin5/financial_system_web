import React, { Component, ChangeEvent } from 'react'
import { NavLink } from 'react-router-dom';
import { Col, Form } from 'reactstrap'
import styled from 'styled-components'
import Buttons from '../components/Buttons'
import Forms from '../components/Forms'
import { validateFormHelper } from '../helpers/validateFormHelper'

interface State {
    email: string,
    password: string,
    confirmPassword: string,
    currency: string,
    name: string,
    innitialValue: string,
    buttonLoad: boolean,
};

interface Props{

};

export default class CreateAccount extends Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {            
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            currency: "",
            innitialValue: "",
            buttonLoad: true
        };
    };

    buttonload = (buttonLoad: boolean) => (this.setState({ buttonLoad }));

    name = (event: ChangeEvent<HTMLInputElement>) => {
        const { password, confirmPassword, innitialValue, currency, email } = this.state;
        const name = event.target.value;
        const validateInputs = { name, password, confirmPassword, innitialValue, currency, email };

        this.setState({ name });
        this.verifyPasswordsMatchs(password, confirmPassword, validateInputs);
    };

    email = (event: ChangeEvent<HTMLInputElement>) => {
        const { password, confirmPassword, innitialValue, currency, name  } = this.state;
        const email = event.target.value;
        const validateInputs = { password, confirmPassword, innitialValue, currency, name };

        this.setState({ email });
        this.verifyPasswordsMatchs(password, confirmPassword, validateInputs);
    };

    password = (event: ChangeEvent<HTMLInputElement>) => {
        const { email, confirmPassword, innitialValue, currency, name } = this.state;
        const password = event.target.value;
        const validateInputs = { password, email, confirmPassword, innitialValue, currency, name };

        this.setState({ password });    
        this.verifyPasswordsMatchs(password, confirmPassword, validateInputs);
    };

    confirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
        const { email, password, innitialValue, currency, name } = this.state;
        const confirmPassword = event.target.value;
        const validateInputs = { confirmPassword, email, password, innitialValue, currency, name };

        this.setState({ confirmPassword });
        this.verifyPasswordsMatchs(password, confirmPassword, validateInputs);
    };

    currency = (event: ChangeEvent<HTMLInputElement>) => {
        const { email, password, innitialValue, confirmPassword, name } = this.state;
        const currency = event.target.value;
        const validateInputs = { confirmPassword, email, password, innitialValue, currency, name };

        this.setState({ currency });
        this.verifyPasswordsMatchs(password, confirmPassword, validateInputs);
    };

    innitialValue = (event: ChangeEvent<HTMLInputElement>) => {
        const { email, password, currency, confirmPassword, name } = this.state;
        const innitialValue = event.target.value;
        const validateInputs = { confirmPassword, email, password, innitialValue, currency, name };

        this.setState({ innitialValue });
        this.verifyPasswordsMatchs(password, confirmPassword, validateInputs);
    };

    verifyPasswordsMatchs = (pass: string, confirmpass: string,  validateInputs: Object) => {
        const verifyPass = pass === confirmpass? validateInputs : {default: ""};

        return validateFormHelper(this.buttonload, verifyPass);  
    };

    render(){
        const { email, password, currency, name, confirmPassword, innitialValue, buttonLoad} = this.state
        const formOne = [{
                label: "Name",
                value: name,
                onChange: this.name,
                type: "text"
            },
            {
            label: "Email",
            value: email,
            onChange: this.email,
            type: "email"
        }];

        const formTwo = [{
            label: "Currency",
            value: currency,
            onChange: this.currency,
            type: "currency"
        },
        {
            label: "Innitial value",
            value: innitialValue,
            onChange: this.innitialValue,
            type: "text"
        }];

        const formThree = [{
                label: "Password",
                value: password,
                onChange: this.password,
                type: "password"
        },
        {
            label: "Confirm password",
            value: confirmPassword,
            onChange: this.confirmPassword,
            type: "password"
        }];

        return(
            <div>
                <HeaderStyled>Create account</HeaderStyled>
                <Form >
                    <Col md="12">
                        <Forms forms={formOne} />
                        <Forms forms={formTwo} />
                        <Forms forms={formThree} />
                    </Col>

                    <ButtonContainer>
                        <Buttons style={buttonStyle} buttonLoad={buttonLoad} 
                            type="submit" color="success" size="sm" value="Create!"
                        />
                        <NavLinkStyled to="/login">Already have an account? click here!</NavLinkStyled>
                    </ButtonContainer>
                </Form>            
            </div>
        )
    };
};

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
`;