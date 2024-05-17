export const AuthService = {
    baseUrl: import.meta.env.VITE_IOT,
    endpoints: {
        login: '/login',
        register: '/register',
        getNodos: '/',
        accionTapa:'/accion',
        dispensar: '/dispensar',
        tienda: '/tienda',
        nodosTienda: '/allNodos',
        pedidos: '/pedido',
        mostrarPedidos: '/pedido',
        eliminarPedido: '/pedido',
    },
};