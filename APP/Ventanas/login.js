import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { decode as base64Decode } from "base-64";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CompLogin = ({ onLogin }) => {
  const [datos, setDatos] = useState({
    usuario: "",
    clave: "",
  });

  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInputChange = (name, value) => {
    setDatos((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  const decodeJwt = (token) => {
    const partes = token.split(".");
    if (partes.length !== 3) {
      throw new Error("Token inválido");
    }
    const cargaUtilBase64Url = partes[1];
    const cargaUtilBase64 = cargaUtilBase64Url
      .replace("-", "+")
      .replace("_", "/");
    const cargaUtil = base64Decode(cargaUtilBase64);
    return JSON.parse(cargaUtil);
  };

  const handleSubmit = async () => {
    console.log("Datos recibidos en handleSubmit:", datos);
    if (!datos.usuario || !datos.clave) {
      setError("Ambos campos son requeridos");
      return;
    }
    try {
      console.log("Realizando solicitud al servidor...");
      const res = await axios.post(
        `https://06bw3q0r-3000.use.devtunnels.ms/api/autenti/iniciSesion`,
        datos
      );
      console.log("Respuesta del servidor:", res.data);
      const { token, error } = res.data;
      if (error) {
        setError(error);
      } else {
        if (token) {
          await AsyncStorage.setItem("token", token);
          console.log("Token almacenado en AsyncStorage:", token);

          const tokenDecodificado = decodeJwt(token);
          const rolId = tokenDecodificado.roleId;
          console.log("Rol ID decodificado:", rolId);

          onLogin(rolId);
        } else {
          console.log(
            "Token no definido. No se pudo almacenar en AsyncStorage."
          );
          setError(
            "No se pudo iniciar sesión. Por favor, verifica tus credenciales."
          );
        }
      }
    } catch (error) {
      console.log("Error en la solicitud axios:", error);
      setError(
        "Error al iniciar sesión. Por favor, verifica tus credenciales."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://i.pinimg.com/236x/c4/93/2d/c4932d47e55d5cbf65cd7cb572bd69fa.jpg",
        }}
        style={{
          height: 150,
          width: 150,
          borderRadius: 65,
          marginTop: -115,
          marginBottom: 25,
        }}
      />
      <Text style={styles.heading}>Bienvenido</Text>
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        value={datos.usuario}
        onChangeText={(usuario) => handleInputChange("usuario", usuario)}
      />
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          secureTextEntry={!passwordVisible} // Usa el estado para controlar la visibilidad
          placeholder="Contraseña"
          value={datos.clave}
          onChangeText={(clave) => handleInputChange("clave", clave)}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.togglePasswordButton}
        >
          <Icon
            name={passwordVisible ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "90%",
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
    padding: 10,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    marginBottom: 25,
  },
  passwordInput: {
    flex: 1,
  },
  togglePasswordButton: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});

export default CompLogin;
