import { Button, Container, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import logo from "../../assets/golden.jpg";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import axios from "axios";
import { ManageNodosService } from "../../api/nodos";
import { LineChart } from "@mui/x-charts";
import { format } from 'date-fns';
import { Gauge } from '@mui/x-charts/Gauge';
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AuthService } from "../../api/users";


interface Data {
    id: number;
    usuario_id: number;
    idnodo: number;
    peso: number;
    distancia: number;
    fechahora: string;
}


const DetailNodo = () => {
    const { id } = useParams();
    const [userNodoPeso, setUserNodos] = useState<Data[]>([]);
    const [userNodoUltrasonido, setUserNodosUltrasonido] = useState<Data[]>([]);
    const [loading, setLoading] = useState(true)
    const [bothCallsCompleted, setBothCallsCompleted] = useState(false);
    const [user, setUser] = useState<number>();


    useEffect(() => {
        const getAllUserNodos = async () => {
            console.log(id);
            try {
                setLoading(true);
                const response = await axios.get(`${ManageNodosService.baseUrl}${ManageNodosService.endpoints.getPeso}/${id}`);
                const response2 = await axios.get(`${ManageNodosService.baseUrl}${ManageNodosService.endpoints.getUltrasonido}/${id}`);
                if (!response.data || !response2.data) {
                    // Si no se encuentran datos, muestra una vista "no hay datos"
                    console.log('No se encontraron datos para el usuario');
                    // Aquí puedes redirigir a una página específica o mostrar un mensaje en la misma página
                } else {
                    setLoading(false);
                    setUserNodos(response.data);
                    setUserNodosUltrasonido(response2.data);
                    setUser(response.data[0].usuario_id);
                    console.log(response.data);
                    console.log(response2.data);
                    setBothCallsCompleted(true);
                }
                if (bothCallsCompleted) {
                    toast.success('Bienvenido a la vista de nodos');
                }

            } catch (error) {
                const res = (error as AxiosError).response?.status;
                if (!bothCallsCompleted === false) {
                    if (res === 401) {
                        toast.error('Contraseña o correo electrónico incorrecto');
                    } else if (res === 404) {
                        toast.error('No se encontró el recurso solicitado');
                    } else {
                        toast.warn('Algo salió mal, no eres tu, somos nosotros, inténtalo de nuevo más tarde');
                    }
                }
                setBothCallsCompleted(true);
            }
        };

        getAllUserNodos();
    }, [id, bothCallsCompleted]);

    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    
    const [detailError, setDetailError] = useState(false);
    const [valueError, setValueError] = useState(false);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${AuthService.baseUrl}${AuthService.endpoints.pedidos}`, {
                mensaje: value,
                tienda: error,
                usuario_id: user,
            });
            const data = response.data;
            console.log("pedido",data);
            toast.success('Pedido realizado con éxito');

        } catch (error) {
            console.error('Error:', error);
            const res1 = (error as AxiosError).response?.status;
            if (res1 === 500) {
                setValueError(true);
                setDetailError(true);
                console.log('User not found');
            }
        }
    };

    if (!userNodoPeso || !userNodoUltrasonido) {
        return
    }
    // ...rest of the code
    return (

        <Box className="flex flex-row">
            <Box className="hidden sm:block">
                <IconButton onClick={() => window.history.back()}>
                    <ArrowBackIcon color="primary" style={{ fontSize: 40 }} />
                </IconButton>
            </Box>
            <Container className="bg-blue-100 flex flex-col justify-center rounded-lg items-center max-w-3x1">
                {!loading && (
                    <>
                        <Box className="bg-white flex flex-row justify-around items-center w-full rounded-lg mt-10 mb-5 ">
                            <Box className="flex flex-col items-center">
                                <Typography variant='h3' >Información</Typography>
                                <Typography variant='h5' >Nodo {id}</Typography>
                            </Box>
                            <Box className="flex flex-col items-center mt-1 mb-1">
                                <CardMedia className="rounded-xl"
                                    component="img"
                                    style={{ height: 100 }}
                                    image={logo}
                                />
                            </Box>
                        </Box>
                    </>
                )}
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-screen">
                        <CircularProgress />
                        <Typography variant="h5" className="ml-4">Cargando...</Typography>
                        <Link to='#' onClick={() => window.history.back()}>
                            <Typography variant="h5" color="primary" className="ml-4">Si tarda demasiado, por favor de click aqui</Typography>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-row justify-around w-full mb-5">
                            <Box className="flex flex-col bg-white ml-3 rounded-2xl h-auto w-screen">
                                <Typography variant='h5' align="center">Peso actual</Typography>
                                <Gauge height={200}
                                    value={userNodoPeso.map(entry => entry.peso).slice(-1)[0]}
                                    text={`${userNodoPeso.map(entry => entry.peso).slice(-1)[0]}gr`}
                                    valueMax={100}
                                    sx={
                                        {
                                            color: 'black',
                                            fontSize: 25,
                                            fontWeight: 'bold',
                                        }
                                    } />
                            </Box>
                            <Box className="flex flex-col bg-white ml-3 rounded-2xl h-auto w-screen">
                                <Typography variant='h5' align="center">Cantidad actual</Typography>
                                <Gauge height={200}
                                    value={userNodoUltrasonido.map(entry => entry.distancia).slice(-1)[0]}
                                    text={`${userNodoUltrasonido.map(entry => entry.distancia).slice(-1)[0]}%`}
                                    valueMax={100}
                                    sx={
                                        {
                                            color: 'black',
                                            fontSize: 30,
                                            fontWeight: 'bold',
                                        }
                                    } />
                            </Box>
                        </div>

                        <Box
                            component="form"
                            display="flex"
                            flexDirection={{ xs: 'column', sm: 'row' }} // En pantallas extra pequeñas (xs), los elementos se apilan verticalmente. En pantallas pequeñas (sm) y mayores, se alinean horizontalmente.
                            justifyContent="space-around"
                            alignItems="center"
                            className='bg-white w-full rounded-lg mb-5'
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{
                                '& > :not(style)': { m: 1, width: { xs: '100%', sm: 'auto' } }, // En pantallas extra pequeñas (xs), los elementos ocupan el ancho completo. En pantallas pequeñas (sm) y mayores, el ancho es automático.
                            }}
                        >
                            <Typography variant="h5" className="font-light">¡Sugerencia de pedido!</Typography>
                            <TextField
                                margin="normal"
                                required
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                error={valueError}
                                name="mensaje"
                                label="¿Pedido?"
                                type="mensaje"
                                id="mensaje"
                                autoComplete="current-password"
                            />
                            <TextField
                                margin="normal"
                                required
                                value={error}
                                onChange={(e) => setError(e.target.value)}
                                error={detailError}
                                name="tienda"
                                label="tienda"
                                type="tienda"
                                id="tienda"
                                autoComplete="current-password"
                            />
                            <TextField
                                margin="normal"
                                value={userNodoPeso.map(entry => entry.usuario_id).slice(-1)[0]}
                                error={valueError}
                                disabled
                                name="usuario id"
                                label="usuario a enviar"
                                type="usuario id"
                                id="usuario id"
                                autoComplete="current-password"
                            />
                            <Button
                                type='submit'
                                variant="contained"  // Puedes cambiar el estilo si deseas
                                sx={{ mt: 1, mb: 2 }}
                            >
                                Sugerir
                            </Button>
                        </Box>

                        <div className="bg-white w-full mb-5 rounded-xl">
                            {userNodoPeso && (
                                <LineChart
                                    xAxis={[{
                                        id: 'Hora',
                                        data: userNodoPeso.slice(-3).map(entry => new Date(entry.fechahora)),
                                        label: 'Hora',
                                        valueFormatter: (entry) => format(entry, 'HH:mm:ss'),
                                    },
                                    ]}
                                    series={[
                                        {
                                            id: 'Peso del plato',
                                            data: userNodoPeso.slice(-3).map(entry => entry.peso),
                                            label: 'Peso (gr)',
                                        },
                                        {
                                            id: 'Ultrasonido',
                                            data: userNodoUltrasonido.slice(-3).map(entry => entry.distancia),
                                            label: 'Cantidad (%)',
                                        },
                                    ]}
                                    margin={{ left: 30, right: 30, top: 30, bottom: 50 }}
                                    grid={{ vertical: true, horizontal: true }}
                                    height={400}
                                />
                            )}
                        </div>
                    </>
                )}
            </Container>
        </Box>
    );
}
export default DetailNodo;