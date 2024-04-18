import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext, useEffect } from "react";
import Cliente from "../../Ventanas/cliente";
import Empleado from "../../Ventanas/empleado";
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
        let navigateTo;
        switch (rolId) {
          case 1:
            navigateTo = "Admin";
            break;
          case 2:
            navigateTo = "Empleado";
            break;
          case 6:
            navigateTo = "Cliente";
            break;
          default:
            console.log("rolId no reconocido:", rolId);
            return;
        }
        navigation.navigate(navigateTo);
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
