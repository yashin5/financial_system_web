import React, {Component, FormEvent, ChangeEvent} from 'react'
import { Col, Container, Form } from 'reactstrap'
import styled from 'styled-components'
import Forms from '../components/Forms'
import HeaderFunction from '../components/HeaderFunction'
import Buttons from '../components/Buttons'


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
            buttonLoad: false
        };
    };

    email = (event: ChangeEvent<HTMLInputElement>) =>{
        this.setState({email: event.target.value})
    };

    value = (event: ChangeEvent<HTMLInputElement>) =>{
        this.setState({value: event.target.value})
    };

    transfer = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.new_balance("1000")
    }

    render(){
        const { email, value, buttonLoad} = this.state
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

        return(
            <Container>
                <HeaderFunction header="Transfer" />
                <Form onSubmit={this.transfer}>
                    <Col md="6">
                        {Forms({forms: formOne})}
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