import React, {Component, FormEvent, ChangeEvent} from 'react'
import { Col, Form } from 'reactstrap'
import styled from 'styled-components'
import Forms from '../components/Forms'
import HeaderFunction from '../components/HeaderFunction'
import SplitTable from '../components/SplitTable'
import Buttons from '../components/Buttons'
import formatValueToAPIAccept from '../helpers/currencyHelper'
import { validateFormHelper, formatValueToValidate } from '../helpers/validateFormHelper'
import { splitTransferService } from '../services/serviceApi'
import Errors from '../components/Errors'

interface SplitItem {
    email: string,
    percent: number,
};

interface State {
    email: string,
    value: string,
    percent: number,
    totalPercent: number,
    splitList: Array<SplitItem>,
    buttonLoad1: boolean,
    buttonLoad2: boolean,
    errors: Array<string>,
};

interface Props{
    new_balance: Function,
    currency_precision: number,
};

export default class Split extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            totalPercent: 0,
            email: "",
            value: "",
            percent: 0,
            splitList: [],
            buttonLoad1: true,
            buttonLoad2: true,
            errors: [""]
        };
    };

    buttonload1 = (buttonLoad1: boolean) => (this.setState({ buttonLoad1 }));
    buttonload2 = (buttonLoad2: boolean) => (this.setState({ buttonLoad2 }));

    totalPercent = (splitList: Array<SplitItem>) =>{
        const totalPercent = splitList.reduce((accumulator: number, item: SplitItem) => accumulator + item.percent, 0.00);
        
        this.setState({ totalPercent });

        return totalPercent
    };

    validateTotalPercent = (splitList: Array<SplitItem>, percent: number) =>{
        return this.totalPercent(splitList) >= 100.00 ||
        this.totalPercent(splitList) + percent > 100.00? 
            "" : percent;
    };

    email = (event: ChangeEvent<HTMLInputElement>) =>{
        const { splitList, percent } = this.state;
        const email = event.target.value;
        const totalPercent = percent > 0? this.validateTotalPercent(splitList, percent) : ""
        const validateInputs = { email, percent: totalPercent };

        this.setEmail( email );

        validateFormHelper(this.buttonload1, validateInputs);       
    };

    setEmail = (email: string) => {
        this.setState({ email });
    };

    value = (event: ChangeEvent<HTMLInputElement>) =>{
        const { splitList } = this.state;
        const value = event.target.value
        const valueToValidate = formatValueToValidate(value)
        const actualPercent = this.totalPercent(splitList);
        const verifyActualPercent = actualPercent === 100? actualPercent : "";
        const validateInputs = { valueToValidate, verifyActualPercent };

        this.setState({ value });
                
        validateFormHelper(this.buttonload2, validateInputs);            
    };

    percent = (event: ChangeEvent<HTMLInputElement>) => {        
        const { email, splitList } = this.state;
        const signedPercent: number = parseFloat(event.target.value);
        const percent: number = Math.max(0, signedPercent); 
        const totalPercent = percent > 0 ? this.validateTotalPercent(splitList, percent) : "";
        const validateInputs = { email, percent: totalPercent };
        this.setPercent( percent );
                
        return validateFormHelper(this.buttonload1, validateInputs);
    };

    setPercent = (percent: number) => {
        this.setState({ percent });
    };

    doSplit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { splitList, value } = this.state;
        const { new_balance } = this.props;
        const formatedValue = formatValueToAPIAccept( value );
        
        this.setState({buttonLoad2: true}, () => {
            splitTransferService( splitList, formatedValue )
            .then(res => res.json())
            .then(res => {
                if(res.error){
                    this.setState( { errors: res.error } )
                }
                else{
                    new_balance(res.new_balance)
                };
            });             
        });
    };

    addItemToSplitTable = () => {
        const { splitList, email, percent, value } = this.state;
        const new_item = { email, percent};
        const newSplitList = [...splitList, new_item];
        const actualPercent = this.totalPercent(newSplitList);

        this.setState({splitList: newSplitList, email: "", percent: 0});

        this.buttonload1(true)
        if(actualPercent === 100){
            const splitInputs = { value }
            validateFormHelper(this.buttonload2, splitInputs);  
        };
    };

    rmItemToSplitTable = (rmSplitItem: SplitItem) => {
        const { splitList } = this.state;
        const newSplitList = splitList.filter((splitItem: SplitItem) => splitItem !== rmSplitItem);
        const actualPercent = this.totalPercent(newSplitList)
        const verifyActualPercent = actualPercent !== 100? true : false
        this.setState({splitList: newSplitList});

        this.setPercent(rmSplitItem.percent);
        this.setEmail(rmSplitItem.email);
        this.buttonload1(false)
        this.buttonload2(verifyActualPercent)
    };

    render(){
        const { totalPercent, email, value, percent, splitList, buttonLoad1, buttonLoad2, errors } = this.state
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
            precision: this.props.currency_precision
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
                            <Errors errors ={errors}/>
                        </ButtonContainer>
                    </Form>
                    <Col md="7">
                        {
                            splitList.length > 0 && 
                            <SplitTable totalPercent={totalPercent} rmTableItem={this.rmItemToSplitTable} split_list={splitList}/>
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
    position: relative;
    display: flex;
    justify-content: space-around;
    width: 200px;
`;
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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