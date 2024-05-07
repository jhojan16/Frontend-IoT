import { Card, Container, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthService } from '../../api/users';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/golden.jpg';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const { id } = useParams();
    const [userNodos, setUserNodos] = useState();
    const navigate = useNavigate();
    const [selectedIcon, setSelectedIcon] = useState(false);
    useEffect(() => {
        const getAllUserNodos = async () => {
            console.log(id);
            const response = await axios.get(`${AuthService.baseUrl}${AuthService.endpoints.getNodos}${id}`);
            if (!response.data || !response.data.nodos) {
                throw new Error('No se encontró el usuario');
            }
            setUserNodos(response.data.nodos);
            console.log(response.data.nodos);
        }

        getAllUserNodos();
    }, [id]);

    const handleClick = async (idnodo: number) => {
        try {
            const jsonData = {
                idnodo: idnodo,
                accionDispensador: 1
            };
            const response = await axios.post(`${AuthService.baseUrl}${AuthService.endpoints.dispensar}`, jsonData);
            console.log('Respuesta del servidor:', response.data);
            // Aquí puedes manejar la respuesta del servidor si es necesario
        } catch (error) {
            console.error('Error al enviar el JSON:', error);
            // Aquí puedes manejar los errores, como mostrar un mensaje al usuario
        }
    };

    const Navigate = useNavigate();
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [detailError, setDetailError] = useState(false);
    const [valueError, setValueError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const user = data.get('user');
        const password = data.get('password')

        try {
            const response = await axios.post(`${AuthService.baseUrl}${AuthService.endpoints.login}`, {
                user: user,
                password: password
            });
            const data = response.data;
            if (data && data.user1) {
                // Accede a la propiedad "id" del objeto "user1"
                const id = data.user1.id;
                const tipo = data.user1.userType;
                console.log(id);
                // Redirecciona a la ruta con el ID del usuario
                Navigate(`/user/${tipo}/${id}`);
            }
            toast.success('Login successful');
        } catch (error) {
            console.error('Error:', error);
            const res1 = (error as AxiosError).response?.status;
            if (res1 === 404) {
                setValueError(true);
                setDetailError(true);
                toast.warn('User not found');
                console.log('User not found');
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
                        <Typography variant="h3">Nodos</Typography>
                    </Grid>
                </Box>
                <Grid container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    margin={5}>
                    {userNodos && userNodos.map((nodo) => (
                        <Grid item key={nodo.idnodo}
                            className='flex flex-row'>
                            <Card className="mt-4 mr-4 max-h-min max-w-xl sm:max-w-80 p-4 rounded-xl">
                                <CardMedia className="rounded-xl"
                                    component="img"
                                    style={{ height: 180 }}
                                    image={logo}
                                />
                                <Grid container justifyContent="space-between" alignItems={'flex-end'}>
                                    <Grid item className="flex flex-col mt-3">
                                        <Button
                                            variant="outlined"
                                            onClick={() => navigate(`${nodo.idnodo}`)}
                                            sx={{ alignSelf: 'left', fontWeight: 600 }}
                                            className='mb-1'
                                        >
                                            Nodo {nodo.idnodo}
                                        </Button>
                                        <Button
                                            variant="contained"
                                            sx={{ alignSelf: 'center', fontWeight: 600 }}
                                            onClick={() => handleClick(nodo.idnodo)}
                                        >
                                            Dispensar {nodo.idnodo}
                                        </Button>
                                    </Grid>
                                    <Grid item className="align-bottom">
                                        <IconButton
                                            onClick={() => setSelectedIcon(nodo.idnodo)}
                                        >
                                            {selectedIcon === nodo.idnodo ? <FavoriteIcon color="error" /> : <FavoriteBorder />}
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box
                    component={'form'}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-around"
                    alignItems="center"
                    className='bg-white w-full rounded-lg mb-2'
                    onSubmit={handleSubmit}
                    >

                    <Typography variant="h5">Realiza tu pedido</Typography>

                    <TextField
                        margin="normal"
                        required
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        name="mensaje"
                        label="mensaje"
                        type="mensaje"
                        id="mensaje"
                        autoComplete="current-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        value={error}
                        onChange={(e) => setError(e.target.value)}
                        name="direccion"
                        label="direccion"
                        type="direccion"
                        id="direccion"
                        autoComplete="current-password"
                    />

                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            
                        >
                            Enviar
                        </Button>
                    </Box>
            </Container>
        </Box>
    );
}
export default Dashboard;