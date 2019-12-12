import React from 'react'
import { Table } from 'reactstrap';
import sortObjectListHelper from '../helpers/sortObjectListHelper'
import styled from 'styled-components'
import {Edit2} from 'react-feather'

interface Contact {
    contact_email: string,
    contact_nickname: string,
};

interface Props{
    contact_list: Array<Contact>,
    auto_fill_email: Function,
};

const ContactsTable = (props: Props) => {
    const autoFillEmail = (email: string) => {
        props.auto_fill_email(email);
    };

    return (
        <Table size="sm">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Nickname</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.contact_list.sort((contactA, contactB) => sortObjectListHelper( contactA, contactB, "nickname" ))
                    .map((contact: Contact) =>(
                        <tr key={contact.contact_email} >
                            <td>{contact.contact_email}</td>
                            <td>
                                <DivIconnick>
                                    {contact.contact_nickname} 
                                    <Edit2Styled onClick={() => autoFillEmail(contact.contact_email)} /> 
                                </DivIconnick>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        
    );
};

export default ContactsTable

const DivIconnick = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Edit2Styled = styled(Edit2)`    
    flex-wrap: no-wrap;
    &:hover{
        opacity: 0.5;
        cursor: pointer
    }
`;