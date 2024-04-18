import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
const Cargando = ({ texto }) => {
  const mensaje = texto ? texto : "Cargando datos";
  return (
    <View style={estilo.contenedor}>
      <ActivityIndicator size="large" color="#000"></ActivityIndicator>
      <View>
        {texto ? (
          <Text style={estilo.texto_}>{texto}</Text>
        ) : (
          <Text style={estilo.texto_}>{mensaje}</Text>
        )}
      </View>
    </View>
  );
};
const estilo = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  texto_: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
  },
});
export default Cargando;
