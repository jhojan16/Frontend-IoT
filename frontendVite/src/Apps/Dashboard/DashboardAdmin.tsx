import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { Button, Container, Typography } from '@mui/material';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
        border: '1px solid',
        borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
        fontSize: 16,
        width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

const DashboardAdmin = () => {
    return (
        <Container className='bg-blue-300 flex flex-col w-96 h-auto rounded-lg items-center mt-28'>
            <Box className='mt-5'>
                <Typography variant='h4' color={'white'}>Manejo de nodos</Typography>
            </Box>
            <Box className=' bg-slate-50 flex flex-col w-80 h-52 items-center mb-5 mt-5 rounded-lg'>
                <Box className='mt-5'>
                    <FormControl variant="standard">
                        <InputLabel shrink htmlFor="bootstrap-input">
                            ID usuario
                        </InputLabel>
                        <BootstrapInput defaultValue="" id="bootstrap-input" />
                    </FormControl>
                </Box>
                <Box className='mt-5'>
                    <FormControl variant="standard">
                        <InputLabel shrink htmlFor="bootstrap-input">
                            Nodo
                        </InputLabel>
                        <BootstrapInput defaultValue="" id="bootstrap-input" />
                    </FormControl>
                </Box>
            </Box>

            <Box className=' flex w-80 flex-row items-center justify-around'>
                <Box className='flex mb-5'>
                    <Button variant='contained' color='primary' title='crear'>Crear</Button>
                </Box>
                <Box className='flex mb-5'>
                    <Button variant='contained' color='primary' title='eliminar'>Eliminar</Button>
                </Box>
            </Box>

        </Container>
    );
};
export default DashboardAdmin;