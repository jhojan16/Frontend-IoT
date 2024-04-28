import { Box } from '@mui/material';
import Deposits from './Deposits'; // Importa el componente Deposits aquí
import data from './sensor.json'; // Importa el archivo JSON aquí
import { useParams } from 'react-router-dom';

export default function Dashboard() {
    const { idnodo } = useParams();
    const infrarrojo = data.datosinfrarrojo.find(inf => inf.idnodo === parseInt(idnodo || ""));
    const peso = data.datospeso.find(p => p.idnodo === parseInt(idnodo || ""));
    return (
        <div>
            <Box>
                <h1>Dashboard</h1>
            </Box>
            <Box>
                <h2>Nodo {idnodo}</h2>
            </Box>
            <div className="flex flex-row">
                <Box>
                    {infrarrojo && (
                        <Box>
                            <Deposits
                                id={infrarrojo.id}
                                idnodo={infrarrojo.idnodo}
                                value ={infrarrojo.actividad}
                                sensor={'Infrarrojo'}
                                fechahora={infrarrojo.fechahora}
                            />
                        </Box>
                    )}
                </Box>
                <Box>
                    {peso && (
                        <Deposits
                            id={peso.id}
                            idnodo={peso.idnodo}
                            value={peso.peso}
                            sensor={'Peso'}
                            fechahora={peso.fechahora.substr(0, 10)}
                        />
                    )}
                </Box>
            </div>
        </div>
    );
}