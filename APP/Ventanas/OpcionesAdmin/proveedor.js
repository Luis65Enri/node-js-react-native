import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CompProveedor = () => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>Proveedor</Text>
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
    }
});
export default CompProveedor;
