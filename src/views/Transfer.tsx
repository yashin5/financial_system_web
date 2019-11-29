import React, {Component, FormEvent, ChangeEvent} from 'react'
import { Col, Container, Form } from 'reactstrap'
import styled from 'styled-components'
import Forms from '../components/Forms'
import HeaderFunction from '../components/HeaderFunction'
import Buttons from '../components/Buttons'
import formatValueToAPIAccept from '../helpers/currencyHelper'
import { validateFormHelper, formatValueToValidate } from '../helpers/validateFormHelper'
import { transferService } from '../services/serviceApi'


interface State {
    email: string,
    value: string,
    buttonLoad: boolean,
};

interface Props{
    new_balance: Function,
};

export default class Deposit extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            email: "",
            value: "",
            buttonLoad: true
        };
    };

    buttonload = (buttonLoad: boolean) => (this.setState({ buttonLoad }));

    email = (event: ChangeEvent<HTMLInputElement>) =>{
        const { value } = this.state
        const email = event.target.value
        const valueToValidate = formatValueToValidate(value)
        const validateInputs = { valueToValidate, email }

        this.setState({ email });

        validateFormHelper(this.buttonload, validateInputs)    
    };

    value = (event: ChangeEvent<HTMLInputElement>) =>{
        const { email } = this.state
        const value = event.target.value
        const valueToValidate = formatValueToValidate(value)
        const validateInputs = { valueToValidate, email }
        this.setState({value: value})

        
        validateFormHelper(this.buttonload, validateInputs)      
    };

    doTransfer = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { value, email} = this.state
        const { new_balance } = this.props
        const formatedValue = formatValueToAPIAccept( value )
        transferService(email, formatedValue)
        .then(res => res.json())
        .then(res => new_balance(res.new_balance));
    };

    render(){
        const { email, value, buttonLoad} = this.state
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

        return(
            <Container>
                <HeaderFunction header="Transfer" />
                <Form onSubmit={this.doTransfer}>
                    <Col md="6">
                        <Forms forms={formOne} />
                    </Col>
                    <ButtonContainer>
                        <Buttons buttonLoad={buttonLoad} value="Do!" 
                            type="submit" color="success" size="sm" 
                        />
                    </ButtonContainer>
                </Form>
            </Container>
        );
    };
};


const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 530px ;
`;