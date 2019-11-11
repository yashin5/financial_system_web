import React from 'react'
import { Table } from 'reactstrap';


interface SplitItem {
    email: string,
    percent: string,
};

interface Props{
    split_list: Array<SplitItem>,
    rmTableItem: Function,
};

const SplitTable = (props: Props) => {
    const editItem = (splitItem: SplitItem) => {
        props.rmTableItem(splitItem);
    };

    return (
        <Table size="sm">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Percent</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.split_list.map((splitItem: SplitItem) =>(
                        <tr key={splitItem.email} onDoubleClick={() => editItem(splitItem)}>
                            <td>{splitItem.email}</td>
                            <td>{splitItem.percent}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}

export default SplitTable