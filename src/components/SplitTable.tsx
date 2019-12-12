import React from 'react'
import { Table } from 'reactstrap';
import sortObjectListHelper from '../helpers/sortObjectListHelper'
import styled from 'styled-components'
import {Edit2} from 'react-feather'

interface SplitItem {
    email: string,
    percent: number,
};

interface Props{
    split_list: Array<SplitItem>,
    rmTableItem: Function,
    totalPercent: number,
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
                    props.split_list.sort((a, b) => sortObjectListHelper(a, b, "percent"))
                    .map((splitItem: SplitItem) =>(
                        <tr key={splitItem.email} onDoubleClick={() => editItem(splitItem)}>
                            <td>{splitItem.email}</td>
                            <td>
                                <DivIconnick>
                                    {splitItem.percent}
                                    <Edit2Styled onClick={() => editItem(splitItem)} /> 
                                </DivIconnick>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            <tfoot>
                    <tr>
                        <td> total</td>
                        <td>{props.totalPercent}</td>
                    </tr>
                </tfoot>
        </Table>
    );
};

export default SplitTable


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