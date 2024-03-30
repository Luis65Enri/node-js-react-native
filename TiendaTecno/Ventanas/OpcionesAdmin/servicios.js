import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CompServicios = () => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>Servicios</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
        marginTop:45,
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
});
export default CompServicios;
