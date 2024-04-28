import Typography from '@mui/material/Typography';
import Title from './Title';
import { Card } from '@mui/material';
import { Link } from 'react-router-dom';


export interface DepositsProps {
    id: number;
    idnodo: number;
    value: number;
    sensor: string;
    fechahora: string;
}

export default function Deposits({ id, idnodo, value, sensor, fechahora }: DepositsProps) {
    return (

        <Link to={`${idnodo}`}>
            <Card className=''>
                <Title>Datos</Title>
                <Typography component="h1" variant="h4">
                    Id: {id}
                </Typography>
                <Typography variant="h4">
                    Nodo: {idnodo}
                </Typography>
                <Typography component="p" variant="h4">
                    Value {sensor}: {value}
                </Typography>
                <Typography variant="h5">
                    Fecha: {fechahora.substr(0, 10)}
                </Typography>
                <div>
                </div>
            </Card>
        </Link>
    );
}
