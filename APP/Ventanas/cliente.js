import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import UserContext from "../src/context/role";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    marginTop: 45,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 5,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 20,
  },
});
const CustomButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Icon name="log-out-outline" size={20} style={styles.buttonIcon} />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
const CompCliente = ({}) => {
  const { userData } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 200,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          borderBottomColor: "#f4f4f4",
          borderBlockWidth: 1,
        }}
      >
        {userData.imagen && (
                <Image
                  source={{ uri: userData.imagen }}
                  style={{
                    height: 130,
                    width: 130,
                    borderRadius: 65,
                  }}
                />
              )}
        <Text
          style={{
            fontSize: 22,
            marginVertical: 6,
            fontWeight: "bold",
            color: "#111",
          }}
        >
          {userData.nombre} {""}
          {userData.apellido}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#111",
          }}
        >
          {userData.correoElectronico}
        </Text>
      </View>
    </View>
  );
};

export default CompCliente;
