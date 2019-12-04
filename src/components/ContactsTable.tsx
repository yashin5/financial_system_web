import React from 'react'
import { Table } from 'reactstrap';
import sortObjectListHelper from '../helpers/sortObjectListHelper'
import styled from 'styled-components'

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
                        <StyledTr key={contact.contact_email} onDoubleClick={() => autoFillEmail(contact.contact_email)}>
                            <td>{contact.contact_email}</td>
                            <td>{contact.contact_nickname}</td>
                        </StyledTr>
                    ))
                }
            </tbody>
        </Table>
        
    );
};

export default ContactsTable

const StyledTr = styled.tr`
    &:hover{
        opacity: 0.5;
        cursor: pointer
    }
`