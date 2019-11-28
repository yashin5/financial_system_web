import React, {Component, FormEvent, ChangeEvent} from 'react'
import { Col, Container, Form } from 'reactstrap'
import styled from 'styled-components'
import Forms from '../components/Forms'
import HeaderFunction from '../components/HeaderFunction'
import Buttons from '../components/Buttons'
import formatValueToAPIAccept from '../helpers/currencyHelper'
import { validateFormHelper, formatValueToValidate } from '../helpers/validateFormHelper'

interface State {
    value: string,
    buttonLoad: boolean,
};

interface Props{
    new_balance: Function,
};

export default class Withdraw extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = { 
            value: "",
            buttonLoad: true
        };
    };

    buttonload = (buttonState: boolean) => (this.setState({ buttonLoad: buttonState }));

    value = (event: ChangeEvent<HTMLInputElement>) =>{        
        const value = event.target.value
        const valueToValidate = formatValueToValidate(value)
        const validateInputs = { valueToValidate } 
        this.setState({value: value});
        
        validateFormHelper(this.buttonload, validateInputs);
    };


    withdraw = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { value } = this.state
        const formatedValue = formatValueToAPIAccept( value )

        this.props.new_balance("1000")
    };

    render(){
        const { value, buttonLoad } = this.state
        const formOne = [
            {
                label: "Value",
                value: value,
                onChange: this.value,
                type: "text",
                maskMoney: true,
                precision: 2
            }
        ];

        return(
            <Container>
                <HeaderFunction header="Withdraw" />
                <Form onSubmit={this.withdraw}>
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