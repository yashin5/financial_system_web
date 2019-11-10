import React from 'react'
import { Col, Row, FormGroup, Input, Label } from 'reactstrap'

import styled from 'styled-components'


const inputFieldFormat = (formProps: any) =>{
    if(formProps.type === "text"){
        return <Input onChange={formProps.onChange} value={formProps.value} type={formProps.type}/>
    }
    else if(formProps.type === "email"){
        return <Input onChange={formProps.onChange} value={formProps.value} type={formProps.type}/>
    }
    else if(formProps.type === "date"){
        return <Input onChange={formProps.onChange} value={formProps.value} type={formProps.type}/>
    }
    else if(formProps.type === "select"){
        return (
            <Input onChange={formProps.onChange} value={formProps.value} type={formProps.type}>
                {formProps.options.map((option: string) =>(<option>{option}</option>))}
            </Input>   
        )
    }
    else if(formProps.type === "textarea"){
        return <Input  onChange={formProps.onChange} value={formProps.value}  type={formProps.type} />
    };
};

interface Form {
    type: string,
    onChange: Function,
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
                props.forms.map((form: any) => (        
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