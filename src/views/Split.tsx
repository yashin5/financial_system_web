import React, {Component, FormEvent, ChangeEvent} from 'react'
import { Col, Container, Form } from 'reactstrap'
import styled from 'styled-components'
import Forms from '../components/Forms'
import HeaderFunction from '../components/HeaderFunction'
import SplitTable from '../components/SplitTable'
import Buttons from '../components/Buttons'


interface SplitItem {
    email: string,
    percent: string,
};

interface State {
    email: string,
    value: string,
    percent: string,
    split_list: Array<SplitItem>,
    buttonLoad: boolean
};

interface Props{
    new_balance: Function,
};

export default class Split extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            email: "",
            value: "",
            percent: "",
            split_list: [],
            buttonLoad: false
        };
    };

    email = (event: ChangeEvent<HTMLInputElement>) =>{
        this.doEmail(event.target.value)
    };

    doEmail = (email: string) => {
        this.setState({ email })
    };

    value = (event: ChangeEvent<HTMLInputElement>) =>{
        this.setState({value: event.target.value})
    };

    percent = (event: ChangeEvent<HTMLInputElement>) => {
        this.doPercent(event.target.value)
    };

    doPercent = (percent: string) => {
        this.setState({ percent })
    };

    split = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { split_list, value } = this.state;
        const transferItem = {value, split_list};
        const token = localStorage.getItem("token")
        const method = "POST";
        const headers = new Headers({"content-type": "application/json", "authorization": `${token}`})
        const body = JSON.stringify(transferItem);

        this.setState({buttonLoad: true}, () => {
            fetch("url", {
                method,
                headers,
                body})
            this.props.new_balance("1000");
        });
    };

    addItemToSplitTable = () => {
        console.log("oi")
        const { split_list, email, percent } = this.state;
        const new_item = { email, percent};

        this.setState({split_list: [...split_list, new_item]})
    };

    rmItemToSplitTable = (rmSplitItem: SplitItem) => {
        const { split_list } = this.state;
        const new_split_list = split_list.filter((splitItem: SplitItem) => splitItem !== rmSplitItem);
        this.doPercent(rmSplitItem.percent);
        this.doEmail(rmSplitItem.email);

        this.setState({split_list: new_split_list});
    };

    render(){
        const { email, value, percent, split_list, buttonLoad} = this.state
        const formOne = [{
            label: "Email",
            value: email,
            onChange: this.email,
            type: "email"
        },
        {
            label: "Percent",
            value: percent,
            onChange: this.percent,
            type: "text"
        }];

        const formTwo = [{
            label: "Value",
            value: value,
            onChange: this.value,
            type: "text",
            maskMoney: true,
            precision: 2
        }];
        
        return(
            <SplitContainer>
                <SplitContainerDelimiter >
                    <Form onSubmit={this.split}>
                        <HeaderFunction header="Split transfer" />
                        <FormGroupContainer>
                            <Col md="12">
                                {Forms({forms: formTwo})}
                            </Col>
                        </FormGroupContainer>
                        <Col md="12">
                            {Forms({forms: formOne})}
                        </Col>
                        <ButtonContainer>
                            <ButtonContainerTwo>
                                <Buttons type="submit" color="success" 
                                    size="sm" buttonLoad={buttonLoad} value="Do!"
                                />
                                <Buttons type="button" color="secondary" 
                                    size="sm" buttonLoad={buttonLoad} value="Add to split"
                                    onClick={this.addItemToSplitTable}
                                />
                            </ButtonContainerTwo>
                        </ButtonContainer>
                    </Form>
                    <Col md="7">
                        {
                            split_list.length > 0 && 
                            <SplitTable rmTableItem={this.rmItemToSplitTable} split_list={split_list}/>
                        }
                    </Col>
                </SplitContainerDelimiter>
            </SplitContainer>
        );
    };
};


const SplitContainerDelimiter = styled.div`
    display: flex;
    flexWrap: wrap;
`;

const ButtonContainerTwo = styled.div`
    display: flex;
    justify-content: space-around;
    width: 200px;
`;
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 530px ;
`;

const FormGroupContainer = styled.div`
    margin-top: 25px;
    width: inherit;
    align-items: left;
`;

const SplitContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
`;