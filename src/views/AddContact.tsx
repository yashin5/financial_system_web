import React, {Component, FormEvent, ChangeEvent} from 'react'
import { Col, Container, Form } from 'reactstrap'
import styled from 'styled-components'
import Forms from '../components/Forms'
import HeaderFunction from '../components/HeaderFunction'
import ContactsTable from '../components/ContactsTable';
import Buttons from '../components/Buttons'



interface Contact {
    nickname: string,
    email: string,
};

interface State {
    email: string,
    nickname: string,
    buttonLoad: boolean,
};

interface Props{
    contact_list: Array<Contact>,
    create_contact: Function,
};

export default class AddContact extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = { 
            email: "",
            nickname: "",
            buttonLoad: false
        };
    };

    email = (event: ChangeEvent<HTMLInputElement>) =>{
        this.doEmail(event.target.value)
    };

    doEmail = (email: string) => {
        this.setState({ email })
    };

    nickname = (event: ChangeEvent<HTMLInputElement>) =>{
        this.setState({nickname: event.target.value})
    };

    contacts = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, nickname } = this.state;

        this.props.create_contact({email, nickname});
    }

    render(){
        const { email, nickname, buttonLoad } = this.state
        const { contact_list } = this.props
        const formOne = [
            {
                label: "Email",
                value: email,
                onChange: this.email,
                type: "email"
            },
            {
                label: "Nickname",
                value: nickname,
                onChange: this.nickname,
                type: "text"
            }
        ];

        return(
            <Container>
                <Col md="6">
                <HeaderFunction header="Contacts" />
                <div style={flex}>
                <Form onSubmit={this.contacts}>
                    <Col md="12">
                        {Forms({forms: formOne})}
                    </Col>
                    <ButtonContainer>
                        <ButtonContainerTwo>
                            <Buttons buttonLoad={buttonLoad} type="submit" color="success"
                                size="sm" value="Create contact" 
                            />
                            <Buttons buttonLoad={buttonLoad} value="Update contact"
                                type="button" color="secondary" size="sm"
                            />
                        </ButtonContainerTwo>
                    </ButtonContainer>
                </Form>
                <Col md="12">
                    <ContactsTable auto_fill_email={this.doEmail} contact_list={contact_list} />  
                </Col>
                </div>
                </Col>
            </Container>
        );
    };
};

const flex = {display: "flex"}

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 530px ;
`;

const ButtonContainerTwo = styled.div`
    display: flex;
    justify-content: space-around;
    width: 300px;
`;