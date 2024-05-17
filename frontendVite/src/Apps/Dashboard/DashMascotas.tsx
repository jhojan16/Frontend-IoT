import { Card, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthService } from '../../api/users';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/golden.jpg';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useSelector } from 'react-redux';
import { UserState } from '../../redux/users/userSlice';

interface nodos {
    idnodo: number;
    // otras propiedades...
}

const Team = () => {
    const user2 = useSelector((state: { user: UserState }) => state.user.id);
    const [userNodos, setUserNodos] = useState<nodos[]>();
    const navigate = useNavigate();
    useEffect(() => {
        const getAllUserNodos = async (user2: number) => {
            const response = await axios.get(`${AuthService.baseUrl}${AuthService.endpoints.nodosTienda}/${user2}`);
            if (!response.data || !response.data.nodos) {
                throw new Error('No se encontró el usuario');
            }
            setUserNodos(response.data.nodos);
        }

        getAllUserNodos(user2);

    }, []);

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
                        <Typography variant="h2" className="font-extrabold">Monitoreo de las mascotas</Typography>
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
                                    </Grid>
                                    <Grid item className="align-bottom">
                                        <IconButton>
                                            <FavoriteIcon color="error" />
                                        </IconButton>
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
export default Team;