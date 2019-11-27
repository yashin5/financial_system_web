import React from 'react'
import { Col, Row, FormGroup, Input, Label } from 'reactstrap'
import CurrencyInput from 'react-currency-input';

import styled from 'styled-components'


const inputFieldFormat = (formProps: any) =>{
    if(formProps.maskMoney){
        return <CurrencyInput value={formProps.value} onChangeEvent={formProps.onChange} 
        precision={formProps.precision} decimalSeparator="," thousandSeparator="." 
        />
    }
    else if(formProps.type === "select"){
        return (
            <Input onChange={formProps.onChange} value={formProps.value} type={formProps.type}>
                {
                    formProps.options?
                    formProps.options.map((option: string) =>(<option>{option}</option>))
                    : false
                }
            </Input>
        )
    }
    else{
        return <Input onChange={formProps.onChange} value={formProps.value} type={formProps.type}/>
    };
};


interface Form {
    type: string,
    onChange: (e: any) => void,
    value: any,
    label: string
    options?: Array<string>
};

interface Props {
    forms: Array<Form>
};

const Forms = (props: Props) =>{
    const forms = (
        <RowContainer >
           { 
                props.forms.map((form: Form) => (        
                    <Col key={form.label} md="4" >
                        <FormGroup >
                            <Label>{form.label}</Label>
                            {inputFieldFormat(form)}            
                        </FormGroup>
                    </Col>       
                ))
            }
        </RowContainer>
        
    );
    return forms
};

export default Forms

const RowContainer = styled(Row)`    
    display: flex;
    justify-content: space-around;
`;