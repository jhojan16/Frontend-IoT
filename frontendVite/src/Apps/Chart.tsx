import { LineChart } from '@mui/x-charts/LineChart';

export interface ChartProps {
    data: { fechahora: string; peso: number }[];
}

export default function Chart({ data }: ChartProps) {
    // Convertir los datos en el formato esperado por el LineChart
    const formattedData = data.map(entry => ({
        x: entry.peso, // Actividad en el eje X
        y: new Date(entry.fechahora).getTime(), // Fecha en el eje Y
    }));

    return (
        <div>
            <h2>Gráfico de Línea</h2>
            <LineChart
                series={[formattedData]}
                options={{
                    scales: {
                        x: { type: 'linear', title: 'Actividad' },
                        y: { type: 'time', title: 'Fecha' },
                    },
                }}
                width={600}
                height={400}
            />
        </div>
    );
}