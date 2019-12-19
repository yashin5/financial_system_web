import React, {Component, FormEvent, ChangeEvent} from 'react'
import { Col, Form } from 'reactstrap'
import styled from 'styled-components'
import Forms from '../components/Forms'
import HeaderFunction from '../components/HeaderFunction'
import Buttons from '../components/Buttons'
import formatValueToAPIAccept from '../helpers/currencyHelper'
import { validateFormHelper, formatValueToValidate } from '../helpers/validateFormHelper'
import { depositService } from '../services/serviceApi'
import Errors from '../components/Errors'

interface State {
    value: string,
    currency: string,
    currencies: Array<string>,
    buttonLoad: boolean,
    errors: Array<string>,
};

interface Props{
    new_balance: Function,
    currencies: Array<string>,
    currency_precision: number,
};

export default class Deposit extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            value: "",
            currency: "",
            currencies: this.props.currencies,
            buttonLoad: true,
            errors: [""]
        };
    };

    buttonload = (buttonLoad: boolean) => (this.setState({ buttonLoad }));

    value = (event: ChangeEvent<HTMLInputElement>) =>{
        const { currency } = this.state;
        const value = event.target.value;
        const valueToValidate = formatValueToValidate(value);
        const validateInputs = { valueToValidate, currency };

        this.setState({value: event.target.value});
        
        validateFormHelper(this.buttonload, validateInputs);
    };

    currency = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = this.state;
        const currency = event.target.value;
        const valueToValidate = formatValueToValidate(value)
        const validateInputs = { valueToValidate, currency };

        this.setState({ currency });
        
        validateFormHelper(this.buttonload, validateInputs)      
    };

    doDeposit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { value, currency } = this.state;
        const { new_balance } = this.props;
        const formatedValue = formatValueToAPIAccept( value );

        depositService(formatedValue, currency)
        .then(res => res.json())
        .then(res => {
            if(res.error){
                this.setState( { errors: res.error } )
            }
            else{
                new_balance(res.new_balance)
            };
        });    
    };

    render(){
        const { value, currency, currencies, buttonLoad, errors } = this.state
        const formOne = [{
            label: "Value",
            value: value,
            onChange: this.value,
            type: "text",
            maskMoney: true,
            precision: this.props.currency_precision
        }];
        console.log(this.props.currency_precision)
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
                <Form onSubmit={this.doDeposit}>
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
                        <Errors errors ={errors}/>
                    </ButtonContainer>                    
                </Form>
            </div>
        );
    };
};


const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    width: 50%;    
`;

const FormContainer = styled.div`
    margin-top: 25px;
    width: inherit;
    align-items: left;
`;