import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
export interface createData{
    id: number;
    idnodo: number;
    value: number;
    fechahora: string
}

export default function Orders({id, idnodo, value, fechahora}: createData) {
    return (
        <React.Fragment>
            <Title>Recent Orders</Title>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>idnodo</TableCell>
                        <TableCell>peso</TableCell>
                        <TableCell>fechahora</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableRow key={id}>
                            <TableCell>{id}</TableCell>
                            <TableCell>{idnodo}</TableCell>
                            <TableCell>{value}</TableCell>
                            <TableCell>{fechahora}</TableCell>
                        </TableRow>
                </TableBody>
            </Table>
        </React.Fragment>
    );
}