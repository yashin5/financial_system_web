import React from 'react'
import { Table } from 'reactstrap';
import sortObjectListHelper from '../helpers/sortObjectListHelper'
import styled from 'styled-components'

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
                        <StyledTr key={splitItem.email} onDoubleClick={() => editItem(splitItem)}>
                            <td>{splitItem.email}</td>
                            <td>{splitItem.percent}</td>
                        </StyledTr>
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


const StyledTr = styled.tr`
    &:hover{
        opacity: 0.5;
        cursor: pointer
    }
`