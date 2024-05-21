import { Card, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthService } from '../../api/users';
import Button from '@mui/material/Button';
import logo from '../../assets/veterinaria.jpg';
import CardMedia from '@mui/material/CardMedia';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PersonIcon from '@mui/icons-material/Person';
import TodayIcon from '@mui/icons-material/Today';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { toast } from 'react-toastify';

interface nodos {
    id: number;
    mensaje: string;
    direccion: string;
    usuario_id: number;
    fechahora: string;
}

const DashboardTienda = () => {

    const [userNodos, setUserNodos] = useState<nodos[]>();
    const [disabled, setDisabled] = useState<Record<number, boolean>>({});
    const [disabled2, setDisabled2] = useState<Record<number, boolean>>({});

    useEffect(() => {
        const getAllUserNodos = async () => {
            const response = await axios.get(`${AuthService.baseUrl}${AuthService.endpoints.tienda}`);
            if (!response.data) {
                throw new Error('No se encontraron pedidos');
            }
            const data = response.data;
            console.log(data);
            setUserNodos(response.data);
        }
        getAllUserNodos();
    }, []);

    const handleClick = async (id: number) => {
        try {
            const response = await axios.delete(`${AuthService.baseUrl}${AuthService.endpoints.tienda}/${id}`);
            console.log('Respuesta del servidor:', response.data);
            // Aquí puedes manejar la respuesta del servidor si es necesario
            toast.warning('Pedido rechazado');
            setDisabled2(prevState => ({ ...prevState, [id]: true })); // Aquí deshabilitamos solo el botón clickeado

        } catch (error) {
            console.error('Error al enviar el JSON:', error);
            // Aquí puedes manejar los errores, como mostrar un mensaje al usuario
        }
    };

    const handleClick2 = async (nodo: nodos) => {
        toast.success('Pedido aceptado');
        try {
            await axios.delete(`${AuthService.baseUrl}${AuthService.endpoints.tienda}/${nodo.id}`);

            setDisabled(prevState => ({ ...prevState, [nodo.id]: true })); // Aquí deshabilitamos solo el botón clickeado
        }
        catch (error) {
            console.error('Error al enviar el JSON:', error);
            // Aquí puedes manejar los errores, como mostrar un mensaje al usuario
        }
    };

    return (
        <Box className="flex flex-row">
            <Container disableGutters className="bg-blue-200 flex flex-col justify-center rounded-lg items-center max-w-3x1 pl-5 pr-5 ">
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-around"
                    alignItems="center"
                    className='bg-white w-full rounded-lg mt-10 '>
                    <Grid item>
                    <Typography variant="h2" className="font-extrabold">Lista de pedidos</Typography>
                    </Grid>
                </Box>
                <Grid container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    margin={5}>
                    {userNodos && userNodos.map((nodo) => (
                        <Grid item key={nodo.id}
                            className='flex flex-row'>
                            <Card className="mt-4 max-h-min max-w-xl sm:max-w-80 p-3 rounded-xl">
                                <CardMedia className="rounded-xl"
                                    component="img"
                                    style={{ height: 180 }}
                                    image={logo}
                                />
                                <div className="flex flex-col mt-3">
                                    <div className="flex items-center justify-start">
                                        <Typography variant="h4" className="font-bold">
                                            Pedido #{nodo.id}
                                        </Typography>
                                    </div>
                                    <Typography variant="h5" className="font-light">
                                        Producto: {nodo.mensaje}
                                    </Typography>
                                    <div className="flex flex-row items-center justify-start">
                                        <AddLocationAltIcon color='primary' className='mr-2' />
                                        <Typography variant="h6" className="font-light">
                                            {nodo.direccion}
                                        </Typography>
                                    </div>
                                    <div className="flex flex-row items-center justify-start">
                                        <PersonIcon color='primary' className='mr-2' />
                                        <Typography variant="h6" className="font-light">
                                            usuario {nodo.usuario_id}
                                        </Typography>
                                    </div>
                                    <div className="flex flex-row items-center justify-start">
                                        <TodayIcon color='primary' className='mr-2' />
                                        <Typography variant="h6" className="font-light">
                                            {nodo.fechahora.split('T')[0]}
                                        </Typography>
                                    </div>
                                    <div className="flex flex-row items-center justify-start">
                                        <AccessTimeIcon color='primary' className='mr-2' />
                                        <Typography variant="h6" className="font-light">
                                        {new Date(nodo.fechahora).toLocaleTimeString()}
                                        </Typography>
                                    </div>
                                </div>
                                <Grid container justifyContent="center">
                                    <Grid item className="flex flex-row mt-3 justify-around space-x-2">
                                        <Button
                                            variant="contained"
                                            sx={{ alignSelf: 'left', fontWeight: 600 }}
                                            className='bg-red-700'
                                            onClick={() => {
                                                handleClick(nodo.id);
                                            }}
                                            disabled={disabled2[nodo.id]}
                                        /*
                                        onClick={() => navigate(`${nodo.id}`)}
                                        */
                                        >
                                            Rechazar
                                        </Button>
                                        <Button
                                            variant="contained"
                                            sx={{ alignSelf: 'left', fontWeight: 600 }}
                                            onClick={() => {
                                                handleClick2(nodo); // Aquí deshabilitamos el botón
                                            }}
                                            disabled={disabled[nodo.id]}
                                        /*
                                        onClick={() => navigate(`${nodo.id}`)}
                                        */
                                        >
                                            Enviar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
export default DashboardTienda;