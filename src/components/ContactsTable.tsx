import React from 'react'
import { Table } from 'reactstrap';
import sortObjectListHelper from '../helpers/sortObjectListHelper'

interface Contact {
    email: string,
    nickname: string,
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
                        <tr key={contact.email} onDoubleClick={() => autoFillEmail(contact.email)}>
                            <td>{contact.email}</td>
                            <td>{contact.nickname}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
};

export default ContactsTable