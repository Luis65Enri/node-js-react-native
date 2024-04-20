import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  ImageBackground,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";
import hamburguesa from "../../assets/Logo.jpg";
import Cargando from "../components/cargando";
import UsuarioContext from "../context/Usuario/usuarioContext";
import EstilosLogin from "../styles/estilosLogin";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [validarUsuario, setValidarUsuario] = useState(false);
  const [validarContrasena, setValidarContrasena] = useState(false);
  const [espera, setEspera] = useState(false);
  const { setLogin, setCerrarSesion, sesionIniciada } =
    useContext(UsuarioContext);
  const titulo = "Iniciar Sesion";
  useEffect(() => {
    setUsuario("");
    setContrasena("");
  }, []);
  useEffect(() => {
    if (!usuario) {
      setValidarUsuario(true);
    } else if (usuario.length < 3) {
      setValidarUsuario(true);
    } else {
      setValidarUsuario(false);
    }
    if (!contrasena) {
      setValidarContrasena(true);
    } else if (contrasena.length < 6) {
      setValidarContrasena(true);
    } else {
      setValidarContrasena(false);
    }
  }, [usuario, contrasena]);

  const iniciarSesion = async () => {
    console.log(usuario);
    if (!validarUsuario && !validarContrasena) {
      setEspera(true);
      await setLogin({ usuario: usuario, contrasena: contrasena });
      setEspera(false);
      console.log(sesionIniciada);
    } else {
      Alert.alert(titulo, "Debe enviar los datos correctos");
    }
    setUsuario("");
    setContrasena("");
  };

  const cerrarSesion = async () => {
    setEspera(true);
    await setCerrarSesion();
    setEspera(false);
  };

  const irpin = () => {};
  return (
    <View style={EstilosLogin.contenedorPrincipal}>
      <View style={EstilosLogin.contenedorTitulo}>
        <ImageBackground
          source={hamburguesa}
          resizeMode="stretch"
          style={EstilosLogin.imagenFondo}
        ></ImageBackground>
        <Text style={EstilosLogin.textoTitulo}>{titulo}</Text>
      </View>
      <View style={EstilosLogin.contenedorContenido}>
        {espera ? (
          <Cargando texto="Estableciendo conexion con la API"></Cargando>
        ) : (
          <>
            <View style={EstilosLogin.contenedorControles}>
              <Text style={EstilosLogin.etiqueta}>Usuario</Text>
              <TextInput
                style={
                  validarUsuario
                    ? EstilosLogin.entradaError
                    : EstilosLogin.entrada
                }
                placeholder="Escriba el correo o usuario"
                value={usuario}
                onChangeText={setUsuario}
              ></TextInput>
              {validarUsuario ? (
                <>
                  <Text style={EstilosLogin.etiquetaError}>
                    Dede escribir el usuario
                  </Text>
                </>
              ) : (
                <></>
              )}
            </View>
            <View style={EstilosLogin.contenedorControles}>
              <Text style={EstilosLogin.etiqueta}>Contraseña</Text>
              <TextInput
                style={
                  validarContrasena
                    ? EstilosLogin.entradaError
                    : EstilosLogin.entrada
                }
                placeholder="Escriba la contraseña"
                secureTextEntry={true}
                value={contrasena}
                onChangeText={setContrasena}
              ></TextInput>
              {validarContrasena ? (
                <>
                  <Text style={EstilosLogin.etiquetaError}>
                    Debe escribir la contrasena
                  </Text>
                </>
              ) : (
                <></>
              )}
            </View>
            <View style={EstilosLogin.contenedorBotones}>
              <View style={EstilosLogin.boton}>
                <Button
                  title="Entrar"
                  color={"#000"}
                  onPress={iniciarSesion}
                ></Button>
              </View>
              <View style={EstilosLogin.boton}>
                <Button
                  title="Cerrar"
                  color={"red"}
                  onPress={cerrarSesion}
                ></Button>
              </View>
            </View>
            <View style={EstilosLogin.contenedorBotones}>
              <View style={EstilosLogin.boton}>
                <Button
                  title="Recuperar Contraseña"
                  color={"#000"}
                  onPress={irpin}
                ></Button>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};
export default Login;
