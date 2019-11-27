import React, {Component, FormEvent, ChangeEvent} from 'react'
import { Col, Container, Form } from 'reactstrap'
import styled from 'styled-components'
import Forms from '../components/Forms'
import HeaderFunction from '../components/HeaderFunction'
import Buttons from '../components/Buttons'


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
            buttonLoad: false
        };
    };

    email = (event: ChangeEvent<HTMLInputElement>) =>{
        this.setState({email: event.target.value})
    };

    value = (event: ChangeEvent<HTMLInputElement>) =>{
        this.setState({value: event.target.value})
    };

    currency = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({currency: event.target.value})
    };

    deposit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.new_balance("1000")
    };

    render(){
        const { email, value, currency, currencies, buttonLoad} = this.state
        const formOne = [{
            label: "Email",
            value: email,
            onChange: this.email,
            type: "text"
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
            <Container>
                <HeaderFunction header="Deposit" />
                <Form onSubmit={this.deposit}>
                    <Col md="6">
                        {Forms({forms: formOne})}
                    </Col>
                    <FormContainer>
                        <Col md="6">
                            {Forms({forms: formTwo})}
                        </Col>
                    </FormContainer>
                    <ButtonContainer>
                        <Buttons buttonLoad={buttonLoad} type="submit" color="success" size="sm" value="Do!"/>
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

const FormContainer = styled.div`
    margin-top: 25px;
    width: inherit;
    align-items: left;
`;