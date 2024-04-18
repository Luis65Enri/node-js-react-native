import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import Pantallas from "./pantallas";
import UsuarioState from "../context/Usuario/usuarioState";

const Navegacion = () => {
  return (
    <NavigationContainer>
      <UsuarioState>
       <Pantallas/>
      </UsuarioState>
    </NavigationContainer>
  );
};
export default Navegacion;