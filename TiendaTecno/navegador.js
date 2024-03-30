import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import CompAdmin from './Ventanas/administrador';
import CompCliente from './Ventanas/cliente';
import CompEmpleado from './Ventanas/empleado';
import CompLogin from './Ventanas/login';

export default function Navegador() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const handleLogin = (rolId) => {
        console.log(`Rol ID: ${rolId}`);
        setIsLoggedIn(true);
        setUserRole(rolId);
    };

    if (!isLoggedIn) {
        return <CompLogin onLogin={handleLogin} />;
    }
    
    switch (userRole) {
        case 1:
            return <CompAdmin setIsLoggedIn={setIsLoggedIn} />;
        case 2:
            return <CompEmpleado setIsLoggedIn={setIsLoggedIn} />;
        case 3:
            return <CompCliente setIsLoggedIn={setIsLoggedIn} />;
        default:
            return <CompLogin onLogin={handleLogin} />;
    }
}
