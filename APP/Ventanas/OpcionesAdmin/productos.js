import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { urlProductos } from "../../src/config/urls";
const CompProductos = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch(urlProductos + "/listar")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCart([...cart, { ...product, quantity }]);
  };

  function clearCart() {
    setCart([]);
  }

  function removeFromCart(productId) {
    setCart(cart.filter((item) => item.id !== productId));
  }
  const [quantity, setQuantity] = useState(1);
  function incrementQuantity() {
    setQuantity(quantity + 1);
  }

  function decrementQuantity() {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  }

  const totalPrice = cart.reduce(
    (total, item) => total + item.precio_producto * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Catalogo de los productos</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image
              source={{
                uri: `https://06bw3q0r-3000.use.devtunnels.ms/api/img/${item.imagen}`,
              }}
              style={styles.productImage}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.nombre_producto}</Text>
              <Text style={styles.productDescription}>
                {item.descripcion_producto}
              </Text>
              <Text style={styles.productPrice}>
                Precio: ${item.precio_producto}
              </Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={incrementQuantity}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
              <Text>{quantity}</Text>
              <TouchableOpacity
                onPress={decrementQuantity}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => addToCart(item)}
              style={styles.addToCartButton}
            >
              <Text style={styles.addToCartText}>Agregar al carrito</Text>
            </TouchableOpacity>
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
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {cart.map((item, index) => (
              <View key={index} style={styles.cartItem}>
                <Text>{item.nombre_producto}</Text>
                <Text>Precio: ${item.precio_producto}</Text>
                <Text>Cantidad: {item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => removeFromCart(item.id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            ))}
            <Text>Total: ${totalPrice.toFixed(2)}</Text>
            <TouchableOpacity
              onPress={clearCart}
              style={styles.clearCartButton}
            >
              <Text style={styles.clearCartButtonText}>Vaciar carrito</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 10,
    marginTop: 45,
  },
  textContainer: {
    marginBottom: 30,
    backgroundColor: "#ccc",
  },
  text: {
    fontSize: 25,
    textAlign: "center",
  },
  productContainer: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "column",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 150,
    aspectRatio: 1,
    resizeMode: "cover",
    marginBottom: 10,
  },
  productDetails: {
    flex: 1,
    width: "100%",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 14,
  },
  productPrice: {
    fontSize: 14,
    color: "green",
  },
  addToCartButton: {
    backgroundColor: "blue",
    color: "white",
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },
  cartIconContainer: {
    position: "absolute",
    right: 10,
    bottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cartItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  removeButton: {
    backgroundColor: "red",
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
  clearCartButton: {
    backgroundColor: "orange",
    color: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "blue",
    color: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: "blue",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    color: "white",
  },
  addToCartButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  addToCartText: {
    color: "white",
  },
  removeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  removeButtonText: {
    color: "white",
  },
  clearCartButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  clearCartButtonText: {
    color: "white",
  },
  closeButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
  },
});

export default CompProductos;
