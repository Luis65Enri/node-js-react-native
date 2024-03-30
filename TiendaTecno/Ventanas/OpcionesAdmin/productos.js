import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View, Button, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CompProductos = () => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetch('https://06bw3q0r-3000.use.devtunnels.ms/api/producto/listar')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    function clearCart() {
        setCart([]);
    }

    function removeFromCart(productId) {
        setCart(cart.filter(item => item.id !== productId));
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>Productos</Text>
            </View>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Image source={{ uri: `https://06bw3q0r-3000.use.devtunnels.ms/api/img/${item.imagen}` }} style={styles.productImage} />
                        <View style={styles.productDetails}>
                            <Text style={styles.productName}>{item.nombre_producto}</Text>
                            <Text style={styles.productDescription}>{item.descripcion_producto}</Text>
                            <Text style={styles.productPrice}>Precio: ${item.precio_producto}</Text>
                        </View>
                        <Button title="Agregar al carrito" onPress={() => addToCart(item)} style={styles.addToCartButton} />
                    </View>
                )}
            />
            <View style={styles.cartIconContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="cart" size={24} color="black" />
                    <Text>{cart.length}</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }
            }>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {cart.map((item, index) => (
                            <View key={index} style={styles.cartItem}>
                                <Text>{item.nombre_producto}</Text>
                                <Text>Precio: ${item.precio_producto}</Text>
                                <Button title="Eliminar" onPress={() => removeFromCart(item.id)} style={styles.removeButton} />
                            </View>
                        ))}
                        <Button title="Cerrar" onPress={() => setModalVisible(!modalVisible)} style={styles.closeButton} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
        marginTop: 45,
    },
    buttonContainer: {
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    productContainer: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 300,
        height: 300,
        resizeMode: 'cover',
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productDescription: {
        fontSize: 16,
    },
    productPrice: {
        fontSize: 16,
        color: 'green',
    },
    addToCartButton: {
        backgroundColor: 'blue',
        color: 'white',
        padding: 10,
        borderRadius: 5,
    },
    cartIconContainer: {
        position: 'absolute',
        right: 10,
        bottom: 710,
        flexDirection: 'row',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    cartItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    removeButton: {
        backgroundColor: 'red',
        color: 'white',
        padding: 10,
        borderRadius: 5,
    },
    closeButton: {
        backgroundColor: 'blue',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
});

export default CompProductos;
