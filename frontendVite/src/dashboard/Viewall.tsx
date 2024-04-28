import Orders from "./Orders";

interface OrdersProps {
    id: number;
    idnodo: number;
    value: number;
    fechahora: string;
}

const viewall = () => {
    return (
        <div>
            <h1>View All</h1>
            <Orders
                id={1}
                idnodo={1}
                value={1}
                fechahora={'2021-10-01'}
            />
        </div>
    );
}
export default viewall;