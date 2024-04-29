import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import data from '../../datosJson/data.json';
// Generate Order Data

export default function Tables() {
    return (
        <React.Fragment>
            <Table stickyHeader >
                <TableHead className='rounded-lg'>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>idnodo</TableCell>
                        <TableCell>value</TableCell>
                        <TableCell>fechahora</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.datospeso.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.idnodo}</TableCell>
                            <TableCell>{order.peso}</TableCell>
                            <TableCell>{order.fechahora.substr(0, 10)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}