import React from "react";
import { Image, StyleSheet, View } from "react-native";

const ImagenPerfil = (props) => {
  return (
    <View style={styles.contenedorImagen}>
      <Image style={styles.imagen} source={{ uri: props.imagen }} />
    </View>
  );
};
const styles = StyleSheet.create({
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
});
export default ImagenPerfil;
