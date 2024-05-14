import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';

interface Props {
    // Define propiedades
    typeUser: string;
}

const renderNodos = ({typeUser}:Props) => {
    return (
        <React.Fragment>
            <ListItemButton component={Link} to={`/user/about`}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Sobre nosotros" />
            </ListItemButton>
            <ListItemButton component={Link} to={`/user/${typeUser}`}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton component={Link} to={`/user/team`}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
            </ListItemButton>
        </React.Fragment>

    );
};

export default renderNodos;
