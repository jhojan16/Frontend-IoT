import Orders from "./Table";
import { Container } from "@mui/material";
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

interface Data {
    id: number;
    usuario_id: number;
    idnodo: number;
    peso: number;
    distancia: number;
    fechahora: string;
}


const ViewAll = () => {
    const { id } = useParams();
    const [userNodoPeso, setUserNodos] = useState<Data[]>([]);
    const [userNodoUltrasonido, setUserNodosUltrasonido] = useState<Data[]>([]);
    const [loading, setLoading] = useState(true)
    const [bothCallsCompleted, setBothCallsCompleted] = useState(false);

    

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
            <Container className="bg-blue-200 flex flex-col justify-center rounded-lg items-center max-w-3x1">
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
                        <Box className="bg-white w-full mb-5 rounded-xl">
                            <Typography variant='h5' align="center">Peso del plato (gr)</Typography>
                        </Box>
                        <div className="flex flex-row justify-between w-full mb-5">
                            <Container className="bg-white max-h-96 overflow-y-auto rounded-xl">
                                {userNodoPeso && (
                                    <Orders
                                        orders={userNodoPeso}
                                    />
                                )}
                            </Container>
                            <Box className="flex flex-col bg-white ml-3 rounded-2xl w-96">
                                <Typography variant='h5' align="center">Peso actual</Typography>
                                <Gauge height={200}
                                    value={userNodoPeso.map(entry => entry.peso).slice(-1)[0]}
                                    text={`${userNodoPeso.map(entry => entry.peso).slice(-1)[0]} gr`}
                                    valueMax={100} 
                                    sx={
                                        {
                                            color: 'black',
                                            fontSize: 25,
                                            fontWeight: 'bold',
                                        }
                                    }/>
                            </Box>
                        </div>

                        <div className="bg-white w-full mb-5 rounded-xl">
                            {userNodoPeso && (
                                <LineChart
                                    xAxis={[{
                                        id: 'Hora',
                                        data: userNodoPeso.slice(-2).map(entry => new Date(entry.fechahora)),
                                        label: 'Hora',
                                        valueFormatter: (entry) => format(entry, 'HH:mm:ss'),
                                    },
                                    ]}
                                    series={[
                                        {
                                            id: 'Peso del plato',
                                            data: userNodoPeso.slice(-2).map(entry => entry.peso),
                                            label: 'Peso (gr)',
                                        },
                                        {
                                            id: 'Ultrasonido',
                                            data: userNodoUltrasonido.slice(-2).map(entry => entry.distancia),
                                            label: 'Cantidad (%)',
                                        },
                                    ]}
                                    margin={{ left: 30, right: 30, top: 30, bottom: 50 }}
                                    grid={{ vertical: true, horizontal: true }}
                                    height={400}
                                />
                            )}
                        </div>
                        <Box className="bg-white w-full mb-5 rounded-xl">
                            <Typography variant='h5' align="center">Cantidad de alimento (%)</Typography>
                        </Box>
                        <div className="flex flex-row justify-between w-full mb-5">
                            <Container className="bg-white max-h-96 overflow-y-auto rounded-xl">
                                {userNodoUltrasonido && (
                                    <Orders
                                        orders={userNodoUltrasonido}
                                    />
                                )}
                            </Container>
                            <Box className="flex flex-col bg-white ml-3 rounded-2xl w-96">
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
                                    }/>
                            </Box>
                        </div>

                    </>
                )}
            </Container>
        </Box>
    );
}
export default ViewAll;