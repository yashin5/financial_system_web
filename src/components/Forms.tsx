import React from 'react'
import { Col, Row, FormGroup, Input, Label } from 'reactstrap'

import styled from 'styled-components'


const inputFieldFormat = (formProps: any) =>{
    if(formProps.type === "text"){
        return <Input onChange={formProps.onChange} value={formProps.value} type="text"/>
    }
    else if(formProps.type === "date"){
        return <Input onChange={formProps.onChange} value={formProps.value} type="date"/>
    }
    else if(formProps.type === "select"){
        return (
            <Input onChange={formProps.onChange} value={formProps.value} type="select">
                {formProps.options.map((option: string) =>(<option>{option}</option>))}
            </Input>   
        )
    }
    else if(formProps.type === "textarea"){
        return <Input  onChange={formProps.onChange} value={formProps.value}  type="textarea" />
    }
};

interface Form {
    type: string,
    onChange: Function,
    value: any,
    label: string
    options?: Array<any>
};

interface Props {
    forms: Array<Form>
};

const Forms = (props: Props) =>{
    const forms = (
        
            props.forms.map((form: any) => (        
                <RowContainer>
                    <Col key={form.label} md="4" >
                        <FormGroup>
                            <Label>{form.label}</Label>
                            {inputFieldFormat(form)}            
                        </FormGroup>
                    </Col>       
                </RowContainer>
            ))
        
    )
    return forms
}

export default Forms

const RowContainer = styled(Row)`    
    display: flex;
    justify-content: space-around;
`;