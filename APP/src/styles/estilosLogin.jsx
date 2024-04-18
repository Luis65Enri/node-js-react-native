import { StyleSheet } from 'react-native';

const EstilosLogin = StyleSheet.create({
   contenedorPrincipal: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    contenedorTitulo: {
      backgroundColor: "#000",
      alignItems: "stretch",
      justifyContent: "flex-end",
      width: "100%",
      height: 150,
    },
    contenedorContenido: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#fff",
      alignItems: "stretch",
      justifyContent: "flex-start",
      width: "100%",
      padding: 20,
    },
    textoTitulo: {
      color: "#fff",
      fontSize: 26,
      fontWeight: "900",
      textAlign: "center",
    },
    imagenFondo: {
      flex: 1,
      justifyContent: "flex-end",
      padding: 20,
    },
    contenedorControles: {
      flexDirection: "column",
      marginTop: 10,
      marginBottom: 10,
    },
    contenedorBotones: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 10,
      marginBottom: 10,
    },
    entradas: {
      borderColor: "#000",
      borderWidth: 1,
      borderRadius: 10,
      padding: 5,
      fontSize: 16,
    },
    entradasError: {
      borderColor: "red",
      borderWidth: 1,
      borderRadius: 10,
      padding: 5,
      fontSize: 16,
    },
    etiqueta: {
      fontSize: 20,
      marginBottom: 5,
    },
    etiquetaError: {
      fontSize: 12,
      marginBottom: 5,
      marginLeft: 5,
      color: "red",
    },
    etiquetaBoton: {
      fontSize: 16,
      marginBottom: 5,
      color: "white",
    },
    boton: {
      flex: 1,
      alignItems: "stretch",
      marginLeft: 10,
      marginRight: 10,
    },
    buttom: {
      alignItems: "center",
      backgroundColor: "black",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    buttom1: {
      alignItems: "center",
      backgroundColor: "red",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
  });
export default EstilosLogin;