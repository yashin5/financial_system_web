import React, {Component, FormEvent, ChangeEvent} from 'react'
import { Container, Form, Button } from 'reactstrap'
import styled from 'styled-components'
import Forms from '../components/Forms'

interface State {
    email: string,
    value: string
};

export default class Withdraw extends Component<{},State> {
    constructor(props: State){
        super(props);
        this.state = {email: "", value: ""}
    };

    email = (event: ChangeEvent<HTMLInputElement>) =>{
        this.setState({email: event.target.value})
    };

    value = (event: ChangeEvent<HTMLInputElement>) =>{
        this.setState({value: event.target.value})
    };

    withdraw = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    render(){
        const { email, value } = this.state
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
            type: "text"
        }]
        return(
            <Container>
                <HeaderFunctions>
                    <h1>Withdraw </h1>
                </HeaderFunctions>
                <Form onSubmit={this.withdraw}>
                    <FormContainer>
                        {Forms({forms: formOne})}
                    </FormContainer>
                    <ButtonContainer>
                        <Button color="success" size="sm">Do!</Button>
                    </ButtonContainer>
                </Form>
            </Container>
        );
    };
};

const HeaderFunctions = styled.div`
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 530px ;
`
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 530px ;
`
const FormContainer = styled(Container)`
    margin-top: 25px;
    width: 600px;
    display: flex;
    justify-content: left;
    align-items: center;
`