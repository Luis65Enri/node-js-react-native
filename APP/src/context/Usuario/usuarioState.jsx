import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useReducer } from "react";
import { Alert } from "react-native";
import Axios from "../../components/axios";
import UsuarioContext from "./usuarioContext";
import UsuarioReducer from "./usuarioReducer";

const UsuarioState = (props) => {
  const incialState = {
    usuario: null,
    token: null,
    rolId: null,
    errores: [],
    msj: "",
    sesionIniciada: false,
    tokenValidado: false,
    aplicacionIniciada: false,
  };
  const [estado, dispath] = useReducer(UsuarioReducer, incialState);
  const setDatos = async () => {
    var sesionIniciada = false;
    var tokenValidado = false;
    const t = await AsyncStorage.getItem("token_almacenado");
    const u = JSON.parse(await AsyncStorage.getItem("usuario_almacenado"));
    const r = JSON.parse(await AsyncStorage.getItem("rolId_almacenado"));
    console.log(t);
    console.log(u);
    if (!r) {
      console.log("rolId no está presente en AsyncStorage");
     }
    if (t) {
      console.log("Entra");
      sesionIniciada = true;
      tokenValidado = true;
    }
    dispath({
      datos: {
        usuario: u,
        token: t,
        sesionIniciada: sesionIniciada,
        tokenValidado: tokenValidado,
        rolId: r,
        aplicacionIniciada: true,
      },
      acciones: "ACTUALIZAR_DATOS",
    });
  };
  const setCerrarSesion = async () => {
    await AsyncStorage.removeItem("token_almacenado");
    await AsyncStorage.removeItem("usuario_almacenado");
    await AsyncStorage.removeItem("RolId_almacenado");
    dispath({
      datos: {
        usuario: null,
        token: null,
        rolId: null,
        sesionIniciada: false,
        tokenValidado: false,
      },
      acciones: "ACTUALIZAR_DATOS",
    });
  };
  const setUsuario = async (data) => {
    const u = JSON.stringify(data);
    await AsyncStorage.setItem("usuario_almacenado", u);
    dispath({
      datos: {
        usuario: data,
      },
      acciones: "ACTUALIZAR_USUARIO",
    });
  };
  const setLogin = async (data) => {
    try {
      var textoMensaje = "";
      var usuario = null;
      var token = null;
      var sesionIniciada = false;
      var tokenValidado = false;
      var rolId = null;
      await Axios.post("/autenticacion/iniciosesion", {
        usuario: data.usuario,
        contrasena: data.contrasena,
      })
        .then(async (data) => {
          const json = data.data;
          console.log(json);
          if (!json.msj) {
            usuario = json.usu;
            token = json.token;
            rolId = usuario.rolId;
            await AsyncStorage.setItem("token_almacenado", String(token));
            const u = JSON.stringify(usuario);
            await AsyncStorage.setItem("usuario_almacenado", u);
            await AsyncStorage.setItem("rolId_almacenado", JSON.stringify(rolId));
            textoMensaje =
              "Bienvenido " + usuario.nombre + " " + usuario.apellido;
            sesionIniciada = true;
            tokenValidado = true;
          } else {
            textoMensaje = json.msj;
          }
        })
        .catch((error) => {
          textoMensaje = "La API no se encuentra activa o no responde";
          console.log(error);
        });
    } catch (error) {
      textoMensaje = "Error en la aplicacion";
      console.log(error);
    }
    Alert.alert("Inicio de sesión", textoMensaje);
    dispath({
      datos: {
        usuario: usuario,
        token: token,
        msj: textoMensaje,
        sesionIniciada: sesionIniciada,
        tokenValidado: tokenValidado,
        rolId: rolId,
      },
      acciones: "SET_LOGIN",
    });
  };
  return (
    <UsuarioContext.Provider
      value={{
        usuarioState: estado.usuario,
        tokenState: estado.token,
        msj: estado.msj,
        inicio: estado.inicio,
        sesionIniciada: estado.sesionIniciada,
        tokenValidado: estado.tokenValidado,
        aplicacionIniciada: estado.aplicacionIniciada,
        rolId: estado.rolId,
        setLogin,
        setDatos,
        setCerrarSesion,
        setUsuario,
      }}
    >
      {props.children}
    </UsuarioContext.Provider>
  );
};
export default UsuarioState;
