import Orders from "./Table";
import { useParams } from "react-router-dom";
import data from "../../datosJson/data.json";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const ViewAll = () => {
    const { idnodo } = useParams();
    const peso = data.datospeso.find(p => p.idnodo === parseInt(idnodo || ""));
    // ...rest of the code
    return (
        <Container className="bg-blue-200 flex flex-col justify-center max-w-3xl rounded-lg">
            <Box className="bg-blue-300 flex flex-col items-center max-w-3xl rounded-lg mt-10">
                <Typography variant='h4' className="">Información</Typography>
                <Typography variant='h5' className="">Nodo {idnodo}</Typography>
                <Typography variant='h5'>Datos almacenados</Typography>
            </Box>

            <Box className="items-center max-h-10">
                <Box className="justify-center">
                    {peso && (
                        <Orders />
                    )}
                </Box>
            </Box>
        </Container>
    );
}
export default ViewAll;