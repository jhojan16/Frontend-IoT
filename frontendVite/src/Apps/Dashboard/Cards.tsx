import Typography from '@mui/material/Typography';
import { Card, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export interface DepositsProps {
    id: number;
    idnodo: number;
    value: number;
    sensor: string;
    fechahora: string;
}

export default function AreaDeposits({ id, idnodo, value, sensor, fechahora }: DepositsProps) {
    return (
        <Link to={`${idnodo}`} style={{ textDecoration: 'none' }}>
            <Card className="flex justify-center items-center mt-4 mr-4 max-h-min max-w-xl sm:max-w-80 p-4 rounded-xl">
                <CardActionArea>
                    <Typography color={'primary'} variant='h4'>Datos {sensor}</Typography>
                    <Typography component="h1" variant="h4">
                        Id: {id}
                    </Typography>
                    <Typography variant="h4">
                        Nodo: {idnodo}
                    </Typography>
                    <Typography component="p" variant="h4">
                        value: {value}
                    </Typography>
                    <Typography variant="h5">
                        Fecha: {fechahora.substr(0, 10)}
                    </Typography>
                </CardActionArea>
            </Card>
        </Link>
    );
}
