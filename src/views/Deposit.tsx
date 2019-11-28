import React, {Component, FormEvent, ChangeEvent} from 'react'
import { Col, Container, Form } from 'reactstrap'
import styled from 'styled-components'
import Forms from '../components/Forms'
import HeaderFunction from '../components/HeaderFunction'
import Buttons from '../components/Buttons'
import formatValueToAPIAccept from '../helpers/currencyHelper'
import { validateFormHelper, formatValueToValidate } from '../helpers/validateFormHelper'


interface State {
    email: string,
    value: string,
    currency: string,
    currencies: Array<string>,
    buttonLoad: boolean,
};

interface Props{
    new_balance: Function,
    currencies: Array<string>
};

export default class Deposit extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            email: "",
            value: "",
            currency: "",
            currencies: this.props.currencies,
            buttonLoad: true
        };
    };

    buttonload = (buttonLoad: boolean) => (this.setState({ buttonLoad }));

    email = (event: ChangeEvent<HTMLInputElement>) =>{
        const { value, currency } = this.state;
        const email = event.target.value;
        const valueToValidate = formatValueToValidate(value);
        const validateInputs = { valueToValidate, email, currency };

        this.setState({ email });

        validateFormHelper(this.buttonload, validateInputs);     
    };

    value = (event: ChangeEvent<HTMLInputElement>) =>{
        const { email, currency } = this.state;
        const value = event.target.value;
        const valueToValidate = formatValueToValidate(value);
        const validateInputs = { valueToValidate, email, currency };

        this.setState({value: event.target.value});
        
        validateFormHelper(this.buttonload, validateInputs);
    };

    currency = (event: ChangeEvent<HTMLInputElement>) => {
        const { email, value } = this.state;
        const currency = event.target.value;
        const valueToValidate = formatValueToValidate(value)
        const validateInputs = { valueToValidate, email, currency };

        this.setState({ currency });
        
        validateFormHelper(this.buttonload, validateInputs)      
    };

    deposit = (event: FormEvent<HTMLFormElement>) => {
        
        const { value, email, currency } = this.state;
        const formatedValue = formatValueToAPIAccept( value );

        this.props.new_balance("1000")
    };

    render(){
        const { email, value, currency, currencies, buttonLoad} = this.state
        const formOne = [{
            label: "Email",
            value: email,
            onChange: this.email,
            type: "email"
        },
        {
            label: "Value",
            value: value,
            onChange: this.value,
            type: "text",
            maskMoney: true,
            precision: 2
        }];

        const formTwo = [{
            label: "Currency",
            value: currency,
            onChange: this.currency,
            type: "select",
            options: currencies 
        }];

        return(
            <div>
                <HeaderFunction header="Deposit" />
                <Form onSubmit={this.deposit}>
                    <Col md="6">
                        <Forms forms={formOne} />
                    </Col>
                    <FormContainer>
                        <Col md="6">
                            <Forms forms={formTwo} />
                        </Col>
                    </FormContainer>
                    <ButtonContainer>
                        <Buttons buttonLoad={buttonLoad} type="submit" color="success" size="sm" value="Do!"/>
                    </ButtonContainer>
                </Form>
            </div>
        );
    };
};


const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 530px ;
`;

const FormContainer = styled.div`
    margin-top: 25px;
    width: inherit;
    align-items: left;
`;