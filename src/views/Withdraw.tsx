import React, {Component, FormEvent, ChangeEvent} from 'react'
import { Col, Container, Form, Button } from 'reactstrap'
import styled from 'styled-components'
import Forms from '../components/Forms'
import HeaderFunction from '../components/HeaderFunction'

interface State {
    value: string
};

interface Props{
    new_balance: Function,
}

export default class Withdraw extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = { value: ""}
    };

    value = (event: ChangeEvent<HTMLInputElement>) =>{
        this.setState({value: event.target.value})
    };

    withdraw = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.new_balance("1000")
    }

    render(){
        const { value } = this.state
        const formOne = [
            {
                label: "Value",
                value: value,
                onChange: this.value,
                type: "text"
            }
        ];

        return(
            <Container>
                <HeaderFunction header="Withdraw" />
                <Form onSubmit={this.withdraw}>
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
`
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 530px ;
`