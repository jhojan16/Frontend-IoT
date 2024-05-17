import { Box, CardMedia, Container, Typography } from "@mui/material";
//import pet from "../../assets/perro.png";
import petNear from "../../assets/pets.jpeg";
import pets from "../../assets/pets.jpg";

const About = () => {
    return (
        <Container className="h-screen w-full mb-40">
            <Typography variant="h1" className="font-extrabold">Pata cuidado</Typography>

            <Box className="flex flex-col">
                <Box className="flex flex-row mb-10">
                    <Box className="flex flex-col w-full mr-5">
                        <Typography variant="body1" className="font-thin">
                            El cuidado de las mascotas se ha transformado con la tecnología. Este dispensador inteligente
                            de alimentos para mascotas utiliza sensores de ultrasonido para medir la cantidad de alimento,
                            infrarrojos para accionar la tapa del contenedor y un sensor de peso que calcula la cantidad
                            de alimento en el plato. Este sistema asegura que tu mascota reciba siempre la cantidad
                            adecuada de comida y mantiene la higiene al evitar el acceso no deseado al alimento.
                        </Typography>
                    </Box>
                    <Box className="flex flex-col w-full">

                        <Typography variant="body1" className="font-thin">
                            Además, el sistema está equipado con un software que envía notificaciones a tu dispositivo móvil 
                            cuando tu mascota se acerca al plato, permitiéndote monitorear su alimentación de manera remota. 
                            Este enfoque innovador no solo mejora la comodidad sino que también promueve la salud y el bienestar 
                            de las mascotas.
                        </Typography>
                    </Box>
                </Box>

                <CardMedia
                    component="img"
                    sx={{
                        width: '100%', // Ajusta el ancho al 100%
                        height: 200, // Ajusta la altura al 100%
                        objectFit: 'cover', // Asegura que la imagen se adapte al contenedor
                        display: { xs: 'none', sm: 'block' }
                    }}
                    image={pets}
                    alt="Dispensador de alimento"
                    className="rounded-xl"
                />
            </Box>

            <Box className="flex flex-col mt-10">
                <Typography variant="h4" className="font-bold" gutterBottom>Alimentación Precisa</Typography>
                <Typography variant="body1" className="font-thin">
                    Los sensores de ultrasonido permiten una medición exacta de la cantidad de alimento que se libera, asegurando que tu mascota reciba la porción adecuada en cada comida. Esta precisión no solo ayuda a mantener el peso ideal de la mascota sino que también contribuye a la prevención de la obesidad y otros problemas de salud relacionados con la dieta.
                </Typography>
            </Box>
            <Box className="flex flex-col mt-10 mb-10">
                <Typography variant="h4" className="font-bold" gutterBottom>Notificaciones Inteligentes</Typography>
                <Typography variant="body1" className="font-thin ">
                    Recibe alertas en tiempo real cada vez que tu mascota se acerque al plato. Estas notificaciones te permiten mantener un registro de los hábitos alimenticios de tu mascota y ajustar las porciones y el horario de alimentación según sea necesario, todo desde tu smartphone.
                </Typography>
            </Box>

            <CardMedia
                component="img"
                sx={{
                    width: screen,
                    height: 300,
                    display: { xs: 'none', sm: 'block' },
                    borderTopLeftRadius: '500px',
                    borderTopRightRadius: '500px',
                }}
                image={petNear}
                alt="Mascota cerca del dispensador"
            />
        </Container>
    );
}
export default About;
