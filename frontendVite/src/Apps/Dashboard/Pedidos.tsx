import { Card, CardMedia, Container, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthService } from '../../api/users';
import Button from '@mui/material/Button';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PersonIcon from '@mui/icons-material/Person';
import TodayIcon from '@mui/icons-material/Today';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { toast } from 'react-toastify';
import { UserState } from '../../redux/users/userSlice';
import { useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import logo from '../../assets/comida.png';

interface nodos {
    id: number;
    mensaje: string;
    tienda: string;
    fechahora: string;
}

const Pedido = () => {
    const [userNodos, setUserNodos] = useState<nodos[]>();
    const [disabled, setDisabled] = useState<Record<number, boolean>>({});
    const [disabled2, setDisabled2] = useState<Record<number, boolean>>({});
    const user = useSelector((state: { user: UserState }) => state.user.id);

    useEffect(() => {
        const getAllUserNodos = async () => {
            const response = await axios.get(`${AuthService.baseUrl}${AuthService.endpoints.mostrarPedidos}/${user}`);
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
            const response = await axios.delete(`${AuthService.baseUrl}${AuthService.endpoints.eliminarPedido}/${id}`);
            console.log('Respuesta del servidor:', response.data);
            // Aquí puedes manejar la respuesta del servidor si es necesario
            toast.warning('Pedido rechazado');
            setDisabled2(prevState => ({ ...prevState, [id]: true })); // Aquí deshabilitamos solo el botón clickeado
        } catch (error) {
            console.error('Error al enviar el JSON:', error);
            // Aquí puedes manejar los errores, como mostrar un mensaje al usuario
        }
    };

    const [value, setValue] = useState<Record<number, string>>({});
    const [detailError, setDetailError] = useState(false);

    const handleClick2 = async (nodo: nodos) => {
        try {
            const response = await axios.post(`${AuthService.baseUrl}${AuthService.endpoints.tienda}`, {
                mensaje: nodo.mensaje,
                usuario_id: user,
                direccion: value[nodo.id]
            });
            const data = response.data;

            await axios.delete(`${AuthService.baseUrl}${AuthService.endpoints.eliminarPedido}/${nodo.id}`);

            console.log("Realizar pedido", data);
            toast.success('Pedido realizado con éxito');
            setDisabled(prevState => ({ ...prevState, [nodo.id]: true })); // Aquí deshabilitamos solo el botón clickeado
            setDetailError(false);



        } catch (error) {
            console.error('Error:', error);
            const res1 = (error as AxiosError).response?.status;
            if (res1 === 500) {
                setDetailError(true);
                console.log('User not found', error);
            }
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
                        <Typography variant="h2" className="font-extrabold">Pedidos sugeridos</Typography>
                    </Grid>
                </Box>
                <Grid container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    margin={2}>
                    {userNodos && userNodos.map((nodo) => (
                        <Grid item key={nodo.id}
                            className='flex flex-row'>
                            <Card className="mt-4 max-h-100 max-w-30 sm:min-w-80 p-5 rounded-xl">
                                <div className="flex flex-col">
                                    <CardMedia className="rounded-xl"
                                        component="img"
                                        style={{ height: 100 }}
                                        image={logo}
                                    />
                                    <div className="flex items-center justify-start mt-3">
                                        <Typography variant="h4" className="font-extrabold">
                                            Sugerido #{nodo.id}
                                        </Typography>
                                    </div>
                                    <Typography variant="h5" className="font-light">
                                        Producto: {nodo.mensaje}
                                    </Typography>
                                    <div className="flex flex-row items-center justify-start">
                                        <AddLocationAltIcon color='primary' className='mr-2' />
                                        <Typography variant="h6" className="font-light">
                                            {nodo.tienda}
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
                                            {nodo.fechahora.split('T')[1].split('.')[0]}
                                        </Typography>
                                    </div>
                                    <div className="flex flex-row items-center justify-start">
                                        <PersonIcon color='primary' className='mr-2' />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            value={value[nodo.id]}
                                            onChange={(e) => setValue({ ...value, [nodo.id]: e.target.value })}
                                            error={detailError}
                                            id="direccion"
                                            label="direccion"
                                            name="direccion"
                                            autoComplete="direccion"
                                            sx={
                                                {
                                                    width: '90%',
                                                    height: 50,
                                                }
                                            }
                                        />
                                    </div>
                                </div>
                                <Grid container justifyContent="center">
                                    <Grid item className="flex flex-row mt-3 justify-around space-x-2">
                                        <Button
                                            variant="contained"
                                            sx={{ alignSelf: 'left', fontWeight: 600 }}
                                            className='bg-red-700'
                                            onClick={() => {
                                                handleClick(nodo.id); // Aquí deshabilitamos el botón
                                            }}
                                            disabled={disabled2[nodo.id]}
                                        /*
                                        onClick={() => navigate(`${nodo.id}`)}
                                        */
                                        >
                                            Eliminar
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
                                            Aceptar {nodo.id}

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
export default Pedido;