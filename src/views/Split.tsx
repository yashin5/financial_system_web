import React, {Component, FormEvent, ChangeEvent} from 'react'
import { Col, Container, Form } from 'reactstrap'
import styled from 'styled-components'
import Forms from '../components/Forms'
import HeaderFunction from '../components/HeaderFunction'
import SplitTable from '../components/SplitTable'
import Buttons from '../components/Buttons'
import formatValueToAPIAccept from '../helpers/currencyHelper'
import { validateFormHelper, formatValueToValidate } from '../helpers/validateFormHelper'


interface SplitItem {
    email: string,
    percent: string,
};

interface State {
    email: string,
    value: string,
    percent: string,
    totalPercent: number,
    split_list: Array<SplitItem>,
    buttonLoad1: boolean,
    buttonLoad2: boolean
};

interface Props{
    new_balance: Function,
};

export default class Split extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            totalPercent: 0,
            email: "",
            value: "",
            percent: "",
            split_list: [],
            buttonLoad1: true,
            buttonLoad2: true
        };
    };

    buttonload1 = (buttonState: boolean) => (this.setState({ buttonLoad1: buttonState }));
    buttonload2 = (buttonState: boolean) => (this.setState({ buttonLoad2: buttonState }));

    totalPercent = (split_list: Array<SplitItem>) =>{
        const totalPercent = split_list.reduce((accumulator: number, item: SplitItem) => accumulator + parseFloat(item.percent), 0.00);
        
        this.setState({ totalPercent });

        return totalPercent
    };

    validateTotalPercent = (split_list: Array<SplitItem>, percent: string) =>{
        return this.totalPercent(split_list) >= 100.00 ||
        this.totalPercent(split_list) + parseInt(percent) > 100.00? 
            "" : percent;
    };

    email = (event: ChangeEvent<HTMLInputElement>) =>{
        const { value } = this.state;
        const email = event.target.value;
        const valueToValidate = formatValueToValidate(value);
        const validateInputs = { valueToValidate, email };

        this.setEmail( email );

        validateFormHelper(this.buttonload1, validateInputs);       
    };

    setEmail = (email: string) => {
        this.setState({ email });
    };

    value = (event: ChangeEvent<HTMLInputElement>) =>{
        const value = event.target.value;

        this.setState({value: value});                
    };

    percent = (event: ChangeEvent<HTMLInputElement>) => {        
        const { email, split_list } = this.state;
        const percent = event.target.value;

        const validateInputs = { email, percent: this.validateTotalPercent(split_list, percent) };
        this.setPercent( percent );

     
        return validateFormHelper(this.buttonload1, validateInputs);        
    };

    setPercent = (percent: string) => {
        this.setState({ percent });
    };

    split = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { split_list, value } = this.state;
        const formatedValue = formatValueToAPIAccept( value );
        const transferItem = {value: formatedValue, split_list};
        const token = localStorage.getItem("token");
        const method = "POST";
        const headers = new Headers({"content-type": "application/json", "authorization": `${token}`})
        const body = JSON.stringify(transferItem);

        this.setState({buttonLoad2: true}, () => {
            fetch("url", {
                method,
                headers,
                body})
            this.props.new_balance("1000");
        });
    };

    addItemToSplitTable = () => {
        const { split_list, email, percent } = this.state;
        const new_item = { email, percent};
        const new_split_list = [...split_list, new_item];
        const actualPercent = this.totalPercent(new_split_list);
        const validateInputs = { email, percent: this.validateTotalPercent(new_split_list, percent) };


        this.setState({split_list: new_split_list, email: "", percent: ""});

        validateFormHelper(this.buttonload1, validateInputs);  
        this.totalPercent(new_split_list)

        if(actualPercent === 100){
            this.buttonload2(false)
        }
    };

    rmItemToSplitTable = (rmSplitItem: SplitItem) => {
        const { split_list } = this.state;
        const new_split_list = split_list.filter((splitItem: SplitItem) => splitItem !== rmSplitItem);
        this.setState({split_list: new_split_list});

        this.setPercent(rmSplitItem.percent);
        this.setEmail(rmSplitItem.email);
        this.buttonload1(false)
        this.totalPercent(new_split_list);
    };

    doSplit = () => {

    }

    render(){
        const { totalPercent, email, value, percent, split_list, buttonLoad1, buttonLoad2} = this.state
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
            type: "number",
            step: "0.01",
            min: "0.01",
            max: "100.00",
            pattern: `[0-9]+([.,][0-9]+)?`
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
                                <Forms forms={formTwo} />
                            </Col>
                        </FormGroupContainer>
                        <Col md="12">
                            <Forms forms={formOne} />
                        </Col>
                        <ButtonContainer>
                            <ButtonContainerTwo>
                                <Buttons type="submit" color="success" 
                                    size="sm" buttonLoad={buttonLoad2} value="Do!"
                                />
                                <Buttons type="button" color="secondary" 
                                    size="sm" buttonLoad={buttonLoad1} value="Add to split"
                                    onClick={this.addItemToSplitTable}
                                />
                            </ButtonContainerTwo>
                        </ButtonContainer>
                    </Form>
                    <Col md="7">
                        {
                            split_list.length > 0 && 
                            <SplitTable totalPercent={totalPercent} rmTableItem={this.rmItemToSplitTable} split_list={split_list}/>
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