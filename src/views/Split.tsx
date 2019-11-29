import React, {Component, FormEvent, ChangeEvent} from 'react'
import { Col, Container, Form } from 'reactstrap'
import styled from 'styled-components'
import Forms from '../components/Forms'
import HeaderFunction from '../components/HeaderFunction'
import SplitTable from '../components/SplitTable'
import Buttons from '../components/Buttons'
import formatValueToAPIAccept from '../helpers/currencyHelper'
import { validateFormHelper, formatValueToValidate } from '../helpers/validateFormHelper'
import { splitTransferService } from '../services/serviceApi'

interface SplitItem {
    email: string,
    percent: number,
};

interface State {
    email: string,
    value: string,
    percent: number,
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
            percent: 0,
            split_list: [],
            buttonLoad1: true,
            buttonLoad2: true
        };
    };

    buttonload1 = (buttonLoad1: boolean) => (this.setState({ buttonLoad1 }));
    buttonload2 = (buttonLoad2: boolean) => (this.setState({ buttonLoad2 }));

    totalPercent = (split_list: Array<SplitItem>) =>{
        const totalPercent = split_list.reduce((accumulator: number, item: SplitItem) => accumulator + item.percent, 0.00);
        
        this.setState({ totalPercent });

        return totalPercent
    };

    validateTotalPercent = (split_list: Array<SplitItem>, percent: number) =>{
        return this.totalPercent(split_list) >= 100.00 ||
        this.totalPercent(split_list) + percent > 100.00? 
            "" : percent;
    };

    email = (event: ChangeEvent<HTMLInputElement>) =>{
        const { split_list, percent } = this.state;
        const email = event.target.value;
        const validateInputs = { email, percent: this.validateTotalPercent(split_list, percent) };

        this.setEmail( email );

        validateFormHelper(this.buttonload1, validateInputs);       
    };

    setEmail = (email: string) => {
        this.setState({ email });
    };

    value = (event: ChangeEvent<HTMLInputElement>) =>{
        const { split_list, percent } = this.state;
        const value = event.target.value;
        const actualPercent = this.totalPercent(split_list);
        const verifyActualPercent = actualPercent === 100? actualPercent : "";
        const validateInputs = { actualPercent, verifyActualPercent };

        this.setState({ value });
                
        validateFormHelper(this.buttonload2, validateInputs);            
    };

    percent = (event: ChangeEvent<HTMLInputElement>) => {        
        const { email, split_list } = this.state;
        const percent = event.target.value;
        const percentFloat = parseFloat(percent);
        const validateInputs = { email, percent: this.validateTotalPercent(split_list, percentFloat) };

        this.setPercent( percentFloat );
     
        return validateFormHelper(this.buttonload1, validateInputs);        
    };

    setPercent = (percent: number) => {
        this.setState({ percent });
    };

    doSplit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { split_list, value } = this.state;
        const { new_balance } = this.props;
        const formatedValue = formatValueToAPIAccept( value );
        
        this.setState({buttonLoad2: true}, () => {
            splitTransferService( split_list, formatedValue )
            .then(res => res.json())
            .then(res => console.log(res));            
        });
    };

    addItemToSplitTable = () => {
        const { split_list, email, percent, value } = this.state;
        const new_item = { email, percent};
        const new_split_list = [...split_list, new_item];
        const actualPercent = this.totalPercent(new_split_list);
        const validateInputs = { email, percent: this.validateTotalPercent(new_split_list, percent) };


        this.setState({split_list: new_split_list, email: "", percent: 0});

        validateFormHelper(this.buttonload1, validateInputs);  
        this.totalPercent(new_split_list)

        if(actualPercent === 100){
            const splitInputs = { value }
            validateFormHelper(this.buttonload2, splitInputs);  
        }
    };

    rmItemToSplitTable = (rmSplitItem: SplitItem) => {
        const { split_list } = this.state;
        const new_split_list = split_list.filter((splitItem: SplitItem) => splitItem !== rmSplitItem);
        const actualPercent = this.totalPercent(new_split_list)
        const verifyActualPercent = actualPercent !== 100? true : false
        this.setState({split_list: new_split_list});

        this.setPercent(rmSplitItem.percent);
        this.setEmail(rmSplitItem.email);
        this.buttonload1(false)
        this.totalPercent(new_split_list);
        this.buttonload2(verifyActualPercent)
    };

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
                    <Form onSubmit={this.doSplit}>
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

const SplitContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;