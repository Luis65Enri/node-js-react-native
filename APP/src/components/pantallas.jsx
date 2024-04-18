import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import Cliente from "../../Ventanas/cliente";
import Empleado from "../../Ventanas/empleado";
import { urlRol } from "../config/urls";
import UsuarioContext from "../context/Usuario/usuarioContext";
import Admin from "../windows/admin/principal";
import Login from "../windows/login";
import Cargando from "./cargando";
const Stack = createStackNavigator();

const Pantallas = () => {
  const { aplicacionIniciada, setDatos, sesionIniciada, rolId } =
    useContext(UsuarioContext);
  const navigation = useNavigation();

  useEffect(() => {
    const initialize = async () => {
      if (!aplicacionIniciada) {
        await setDatos();
      }
      if (sesionIniciada && rolId !== null) {
        try {
          const response = await axios.get(urlRol + "/listar");
          console.log("Respuesta de la API:", response.data);
          const roles = response.data;
          let navigateTo;
          const rolUsuario = roles.find((rol) => rol.id === rolId);
          if (rolUsuario) {
            console.log("Rol encontrado:", rolUsuario);
            const tipoRolLower = rolUsuario.tipo_rol.toLowerCase().trim();
            switch (tipoRolLower) {
              case "administrador":
                navigateTo = "Admin";
                break;
              case "empleado":
                navigateTo = "Empleado";
                break;
              case "cliente":
                navigateTo = "Cliente";
                break;
              default:
                console.log("Tipo de rol no reconocido:", rolUsuario.tipo_rol);
                return;
            }
            console.log("Navegando a:", navigateTo);
            navigation.navigate(navigateTo);
          } else {
            console.log("Rol no encontrado para el usuario actual.");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    initialize();
  }, [rolId, navigation, sesionIniciada, aplicacionIniciada, setDatos]);

  if (aplicacionIniciada) {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: "",
            headerStyle: {
              height: 0,
            },
          }}
        />
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={{
            headerShown: false,
            headerTitle: "",
            headerStyle: {
              height: 0,
            },
          }}
        />
        <Stack.Screen name="Cliente" component={Cliente} />
        <Stack.Screen name="Empleado" component={Empleado} />
      </Stack.Navigator>
    );
  } else {
    return <Cargando texto="Cargando aplicación" />;
  }
};

export default Pantallas;
