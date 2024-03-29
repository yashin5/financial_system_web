import React, {Component, FormEvent, ChangeEvent} from 'react'
import { Col, Form } from 'reactstrap'
import styled from 'styled-components'
import Forms from '../components/Forms'
import HeaderFunction from '../components/HeaderFunction'
import Buttons from '../components/Buttons'
import Errors from '../components/Errors'
import formatValueToAPIAccept from '../helpers/currencyHelper'
import { validateFormHelper, formatValueToValidate } from '../helpers/validateFormHelper'
import { withdrawnService } from '../services/serviceApi'

interface State {
    value: string,
    buttonLoad: boolean,
    errors: Array<string>
};

interface Props{
    new_balance: Function,
    currency_precision: number,
};

export default class Withdraw extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = { 
            value: "",
            buttonLoad: true,
            errors: [""]
        };
    };

    buttonload = (buttonLoad: boolean) => (this.setState({ buttonLoad }));

    value = (event: ChangeEvent<HTMLInputElement>) =>{        
        const value = event.target.value;
        const valueToValidate = formatValueToValidate(value);
        const validateInputs = { valueToValidate };
        this.setState({value: value});
        
        validateFormHelper(this.buttonload, validateInputs);
    };


    withdraw = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { value } = this.state;
        const { new_balance } = this.props;
        const formatedValue = formatValueToAPIAccept( value );

        withdrawnService(formatedValue)
        .then(res=> res.json())
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
        const { errors, value, buttonLoad } = this.state
        const formOne = [
            {
                label: "Value",
                value: value,
                onChange: this.value,
                type: "text",
                maskMoney: true,
                precision: this.props.currency_precision
            }
        ];

        return(
            <div>
                <HeaderFunction header="Withdraw" />
                <Form onSubmit={this.withdraw}>
                    <Col md="6">
                        <Forms forms={formOne} />
                    </Col>
                    <ButtonContainer>
                        <Buttons buttonLoad={buttonLoad} value="Do!" 
                            type="submit" color="success" size="sm" 
                        />
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

