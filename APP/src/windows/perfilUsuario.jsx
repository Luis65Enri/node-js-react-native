import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import hamburguesa from "../../assets/Logo.jpg";
import AxiosImagen from "../components/axiosImagen";
import Cargando from "../components/cargando";
import ImagenPerfil from "../components/imagenPerfil";
import { urlImagenesUsuario } from "../config/urls";
import UsuarioContext from "../context/Usuario/usuarioContext";
import Estilos from "../styles/estilosLogin";
const uriHamburguesa = Image.resolveAssetSource(hamburguesa).uri;

const PerfilUsuario = () => {
  const { usuarioState, setCerrarSesion, tokenState, setUsuario } =
    useContext(UsuarioContext);

  const navigation = useNavigation();
  const [nombre, setnombre] = useState(usuarioState?.nombre || null);
  const [apellido, setApellido] = useState(usuarioState?.apellido || null);
  const [validarUsuario, setValidarUsuario] = useState(false);
  const [validarContrasena, setValidarContrasena] = useState(false);
  const [nombreCompleto, setNombreCompleto] = useState(nombre + " " + apellido);
  const [imagen, setImagen] = useState(cargarImagen);
  const [espera, setEspera] = useState(false);
  const [modificar, setModificar] = useState(false);
  const cambioSwitch = () => setModificar((previousState) => !previousState);
  const titulo = "Perfil de Usuario";
  useEffect(() => {
    if (!nombre) {
      setValidarUsuario(true);
    } else if (nombre.length < 3) {
      setValidarUsuario(true);
    } else {
      setValidarUsuario(false);
    }
    if (!apellido) {
      setValidarContrasena(true);
    } else if (apellido.length < 6) {
      setValidarContrasena(true);
    } else {
      setValidarContrasena(false);
    }
  }, [nombre, apellido]);
  useEffect(() => {
    console.log("Se actualizo los datos");
    setnombre(usuarioState.nombre);
    setApellido(usuarioState.apellido);
    setNombreCompleto(nombre + " " + apellido);
    setImagen(cargarImagen);
  }, [espera]);

  const cerrarSesion = async () => {
    await setCerrarSesion();
    navigation.navigate("Login");
  };
  const cargarImagen = () => {
    if (!usuarioState.imagen) {
      return uriHamburguesa;
    } else {
      console.log(urlImagenesUsuario + usuarioState.imagen);
      return urlImagenesUsuario + usuarioState.imagen;
    }
  };

  const actualizarImagen = async () => {
    Alert.alert(titulo, "Seleccione la imagen");
    setEspera(true);
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    //let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        titulo,
        "Para seleccionar la imagen debe brindar permisos a acceso"
      );
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });
    console.log(pickerResult.assets[0]);
    const archivo = new FormData();
    let uriParts = pickerResult.assets[0].uri.split(".");
    let tipo =
      pickerResult.assets[0].type + "/" + uriParts[uriParts.length - 1];
    uriParts = pickerResult.assets[0].uri.split("/");
    let nombre = uriParts[uriParts.length - 1];
    uriParts = pickerResult.assets[0].uri;
    archivo.append("img", {
      name: nombre,
      type: tipo,
      uri: uriParts,
    });
    var textoMensaje = "";
    AxiosImagen.defaults.headers.common["Authorization"] =
      "Bearer " + tokenState;
    await AxiosImagen.post("/usuario/img", archivo)
      .then(async (data) => {
        const json = data.data;
        console.log(json);
        if (json.imagen) {
          textoMensaje = "Imagen Actualizada";
          usuarioState.imagen = json.imagen;
          console.log(usuarioState);
          await setUsuario(usuarioState);
        } else {
          textoMensaje = "";
          json.errores.forEach((element) => {
            textoMensaje += element.mensaje + ". ";
          });
        }
      })
      .catch((er) => {
        console.log(er);
      });
    setEspera(false);
    Alert.alert(titulo, textoMensaje);
  };
  return (
    <View style={Estilos.contenedorPrincipal}>
      <View style={Estilos.contenedorTitulo}>
        <ImageBackground
          source={hamburguesa}
          resizeMode="stretch"
          style={Estilos.imagenFondo}
        >
          <Text style={Estilos.textoTitulo}>{titulo}</Text>
        </ImageBackground>
      </View>
      <View style={Estilos.contenedorContenido}>
        {espera ? (
          <Cargando texto="Estableciendo conexion con la API"></Cargando>
        ) : (
          <>
            <View style={Estilos.contenedorControles}>
              <ImagenPerfil imagen={imagen}></ImagenPerfil>
              {modificar ? (
                <>
                  <TouchableOpacity
                    style={styles.touch}
                    onPress={actualizarImagen}
                  >
                    <Text style={Estilos.etiquetaBoton}>Editar imagen</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <></>
              )}
            </View>
            <View style={Estilos.contenedorControles}>
              <Text style={Estilos.etiqueta}>
                {"Nombre: " + nombreCompleto}
              </Text>
              <Text style={Estilos.etiqueta}>
                {"Correo: " + usuarioState?.correo || null}
              </Text>
              <Text style={Estilos.etiqueta}>
                {"Usuario: " + usuarioState?.nombre || null}
              </Text>
              <Text style={Estilos.etiqueta}>
                {"imagen: " + usuarioState?.imagen || null}
              </Text>
            </View>
            <View style={Estilos.contenedorBotones}>
              <View style={Estilos.boton}>
                <Switch
                  trackColor={{ false: "red", true: "black" }}
                  thumbColor={modificar ? "black" : "black"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={cambioSwitch}
                  value={modificar}
                />
              </View>
              <Text style={styles.texto}>
                {modificar ? "Editando" : "Presione para editar"}
              </Text>
            </View>
            {modificar ? (
              <>
                <View style={Estilos.contenedorBotones}>
                  <View style={Estilos.boton}>
                    <Button title="Guardar Cambios" color={"#000"}></Button>
                  </View>
                </View>
              </>
            ) : (
              <></>
            )}
            <View style={Estilos.contenedorBotones}>
              <View style={Estilos.boton}>
                <Button
                  title="Cerrar Sesión"
                  color={"red"}
                  onPress={cerrarSesion}
                ></Button>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  sombraControles: {
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  touch: {
    alignItems: "center",
    margin: 10,
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 30,
  },
  entradas: {
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    fontSize: 20,
    fontWeight: "400",
    color: "#495057",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ced4da",
    borderRadius: 15,
  },
  imagen: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    borderWidth: 3,
    borderColor: "#dedede",
    borderRadius: 90,
  },
  contenedorImagen: {
    alignItems: "center",
  },
  texto: {
    color: "black",
    textDecorationColor: "yellow",
    textShadowColor: "red",
    textShadowRadius: 1,
    marginLeft: 10,
    marginRight: 10,
  },
});
export default PerfilUsuario;
