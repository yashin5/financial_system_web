import React, {Component, FormEvent, ChangeEvent} from 'react'
import { Col, Container, Form } from 'reactstrap'
import styled from 'styled-components'
import Forms from '../components/Forms'
import HeaderFunction from '../components/HeaderFunction'
import Buttons from '../components/Buttons'

interface State {
    value: string,
    buttonLoad: boolean,
};

interface Props{
    new_balance: Function,
}

export default class Withdraw extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = { 
            value: "",
            buttonLoad: false
        };
    };

    value = (event: ChangeEvent<HTMLInputElement>) =>{
        this.setState({value: event.target.value})
    };

    withdraw = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.new_balance("1000")
    }

    render(){
        const { value, buttonLoad } = this.state
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
`