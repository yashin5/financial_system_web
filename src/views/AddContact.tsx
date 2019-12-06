import React, {Component, FormEvent, ChangeEvent} from 'react'
import { Col, Form } from 'reactstrap'
import styled from 'styled-components'
import Forms from '../components/Forms'
import HeaderFunction from '../components/HeaderFunction'
import ContactsTable from '../components/ContactsTable';
import Buttons from '../components/Buttons'
import { validateFormHelper } from '../helpers/validateFormHelper'
import { addContactService, updateContactService } from '../services/serviceApi'




interface Contact {
    contact_nickname: string,
    contact_email: string,
};

interface State {
    email: string,
    nickname: string,
    buttonLoad1: boolean,
    buttonLoad2: boolean,
    errors: Array<string>
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
            buttonLoad1: true,
            buttonLoad2: true,
            errors: [""],
        };
    };

    buttonload1 = (buttonState: boolean) => (this.setState({ buttonLoad1: buttonState }));
    buttonload2 = (buttonState: boolean) => (this.setState({ buttonLoad2: buttonState }));

    verifyIfContactAlreadyExist = (email: string) => {
        const { contact_list } = this.props;
        const verifyng_list = contact_list.filter((contact: Contact) => contact.contact_email === email);

        if (verifyng_list.length !== 0){
            this.buttonload1(true)
            return true
        }
        else{
            this.buttonload1(false)
            return false
        };
    };

    activeOrDeactiveButton = (validateInputs : Object, email: string) => {
        if(this.verifyIfContactAlreadyExist(email)){
            validateFormHelper(this.buttonload1, {...validateInputs, email: ""});
            validateFormHelper(this.buttonload2, {...validateInputs, email });     
        }
        else{
            validateFormHelper(this.buttonload1, {...validateInputs, email});  
            validateFormHelper(this.buttonload2, {...validateInputs, email: "" });        
        };
    };

    email = (event: ChangeEvent<HTMLInputElement>) =>{
        const { nickname } = this.state;
        const email = event.target.value;
        const validateInputs = { nickname };

        this.setEmail( email );
        this.activeOrDeactiveButton(validateInputs, email);
    };

    setEmail = (email: string) => {
        const { nickname } = this.state;
        const validateInputs = { nickname };

        this.setState({ email });
        this.activeOrDeactiveButton(validateInputs, email);
    };

    nickname = (event: ChangeEvent<HTMLInputElement>) =>{
        const { email } = this.state;
        const nickname = event.target.value;
        const validateInputs = { nickname };

        this.setState( {nickname} );
        this.activeOrDeactiveButton(validateInputs, email);
    };

    createContacts = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();        
        const { email, nickname } = this.state;
        const { create_contact } = this.props
        addContactService( nickname, email )
        .then(res => res.json())
        .then(res => {
            if(res.error){
                this.setState({errors: [res.error]})
            } 
            else{
                create_contact({ contact_nickname: nickname, contact_email: email });    
            }                        
        });
    };

    updateContact = () => {
        const { email, nickname } = this.state;
        const { create_contact } = this.props
        updateContactService( nickname, email )
        .then(res => res.json())
        .then(res => {
            if(res.error){
                this.setState({errors: [res.error]})
            } 
            else{
                create_contact({ contact_nickname: nickname, contact_email: email });    
            }                        
        });        
    };

    render(){
        const { errors, email, nickname, buttonLoad1, buttonLoad2 } = this.state;
        const { contact_list } = this.props;
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
            <div>
                <Col md="6">
                <HeaderFunction header="Contacts" />
                <div style={flex}>
                    <Form onSubmit={this.createContacts}>
                        <Col md="12">
                            <Forms forms={formOne} />
                        </Col>
                        <ButtonContainer>
                            <ButtonContainerTwo>

                                <ErrorsDiv>
                                    <Buttons buttonLoad={buttonLoad1} type="submit" color="success"
                                        size="sm" value="Create contact" 
                                    />
                                    {
                                        errors && errors.map(error => 
                                            <SpanStyled>{error}</SpanStyled>
                                        )
                                    }
                                </ErrorsDiv>    
                                <ErrorsDiv>
                                    <Buttons onClick={this.updateContact} buttonLoad={buttonLoad2} value="Update contact"
                                        type="button" color="secondary" size="sm"
                                    />
                                    {
                                        false && errors.map(error => 
                                            <SpanStyled>{error}</SpanStyled>
                                        )
                                    }
                                </ErrorsDiv>                                
                            </ButtonContainerTwo>
                        </ButtonContainer>
                    </Form>
                    <Col md="12">
                        <ContactsTable auto_fill_email={this.setEmail} contact_list={contact_list} />  
                    </Col>
                </div>
                </Col>
            </div>
        );
    };
};

const ErrorsDiv = styled.div`
    display: flex;
    flex-direction: column
`
const SpanStyled = styled.span`
    font-size: 0.6rem;
    color: red
`;

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