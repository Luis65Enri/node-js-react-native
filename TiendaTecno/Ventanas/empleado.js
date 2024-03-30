import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Icon name="log-out-outline" size={20} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const CompEmpleado = ({ setIsLoggedIn }) => {

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>Empleado</Text>
                <CustomButton onPress={handleLogout} title="Cerrar sesión" />
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
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    buttonIcon: {
        marginRight: 10,
    },
    buttonText: {
        fontSize: 20,
        color: '#FFFFFF',
    },
});
export default CompEmpleado;
