import React, {Component, FormEvent, ChangeEvent} from 'react'
import { Col, Container, Form, Button } from 'reactstrap'
import styled from 'styled-components'
import Forms from '../components/Forms'


interface State {
    email: string,
    value: string,
};

interface Props{
    new_balance: Function,
};

export default class Deposit extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {email: "", value: ""}
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
                    <h1>Transfer </h1>
                </HeaderFunctions>
                <Form onSubmit={this.transfer}>
                    <Col md="6">
                        {Forms({forms: formOne})}
                    </Col>
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
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 530px ;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 530px ;
`;