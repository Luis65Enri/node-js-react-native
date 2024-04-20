import axios from "axios";
import React, { useEffect, useState } from "react";
import {
 Button,
 FlatList,
 Modal,
 SafeAreaView,
 StyleSheet,
 Text,
 TextInput,
 TouchableOpacity,
 View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { urlCategoria } from "../../src/config/urls";

const CompCategoria = () => {
 const [categorias, setCategorias] = useState([]);
 const [nuevoNombreCategoria, setNuevoNombreCategoria] = useState("");
 const [categoriaEnEdicion, setCategoriaEnEdicion] = useState(null);
 const [modalVisible, setModalVisible] = useState(false);
 const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
 const [busqueda, setBusqueda] = useState("");

 const buscarCategorias = async () => {
    try {
      let categoriasResultantes = [];

      if (busqueda === "") {
        const response = await axios.get(`${urlCategoria}/listar`);
        categoriasResultantes = Array.isArray(response.data) ? response.data : [];
      } else {
        const responseNombre = await axios.get(`${urlCategoria}/buscar`, {
          params: {
            nombre: busqueda,
          },
        });
        const responseId = await axios.get(`${urlCategoria}/buscar`, {
          params: {
            id: busqueda,
          },
        });

        categoriasResultantes = [
          ...(Array.isArray(responseNombre.data) ? responseNombre.data : []),
          ...(Array.isArray(responseId.data) ? responseId.data : []),
        ];

        categoriasResultantes = Array.from(
          new Set(categoriasResultantes.map((categoria) => categoria.id))
        ).map((id) => categoriasResultantes.find((categoria) => categoria.id === id));
      }

      setCategorias(categoriasResultantes);
    } catch (error) {
      console.error(error);
    }
 };

 useEffect(() => {
    buscarCategorias();
 }, [busqueda]);

 useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await axios.get(urlCategoria + "/listar");
        setCategorias(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    obtenerCategorias();
 }, []);

 useEffect(() => {
    if (nuevoNombreCategoria === "") {
      setCategoriaEnEdicion(null);
    }
 }, [nuevoNombreCategoria]);

 const guardarCategoria = async () => {
    try {
      const response = await axios.post(urlCategoria + "/guardar", {
        nombre_categoria: nuevoNombreCategoria,
      });
      setCategorias([...categorias, response.data]);
      limpiarCampos();
    } catch (error) {
      console.error(error);
    }
 };

 const editarCategoria = async (id) => {
    const categoria = categorias.find((categoria) => categoria.id === id);
    if (categoria) {
      setNuevoNombreCategoria(categoria.nombre_categoria);
      setCategoriaEnEdicion(categoria);
    }
 };

 const actualizarCategoria = async () => {
    try {
      const response = await axios.put(
        `${urlCategoria}/editar?id=${categoriaEnEdicion.id}`,
        {
          nombre_categoria: nuevoNombreCategoria,
        }
      );
      setCategorias(
        categorias.map((categoria) =>
          categoria.id === categoriaEnEdicion.id ? response.data : categoria
        )
      );
      limpiarCampos();
      setCategoriaEnEdicion(null);
    } catch (error) {
      console.error(error);
    }
 };

 const eliminarCategoria = async (id) => {
    try {
      const response = await axios.delete(`${urlCategoria}/eliminar?id=${id}`);
      console.log(response.data);
      setCategorias(categorias.filter((categoria) => categoria.id !== id));
    } catch (error) {
      console.error(error);
    }
 };

 const limpiarCampos = () => {
    setNuevoNombreCategoria("");
    setCategoriaEnEdicion(null);
 };

 const abrirModal = (id) => {
    setCategoriaSeleccionada(id);
    setModalVisible(true);
 };

 const cerrarModal = () => {
    setModalVisible(false);
 };

 const seleccionarAccion = (accion) => {
    if (accion === "editar") {
      editarCategoria(categoriaSeleccionada);
    } else if (accion === "eliminar") {
      eliminarCategoria(categoriaSeleccionada);
    } else if (accion === "cancelar") {
      cerrarModal();
    }
 };

 return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar Categoría por Nombre"
        onChangeText={(text) => setBusqueda(text)}
        value={busqueda}
      />
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.fila}>
            <View style={styles.celdaID}>
              <Text>{item.id}</Text>
            </View>
            <View style={styles.celda}>
              <Text>{item.nombre_categoria}</Text>
            </View>
            <View style={styles.acciones}>
              <TouchableOpacity
                onPress={() => abrirModal(item.id)}
                style={styles.button}
              >
                <Icon name="ellipsis-vertical" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Nombre de Categoría"
          onChangeText={setNuevoNombreCategoria}
          value={nuevoNombreCategoria}
        />
        {categoriaEnEdicion ? (
          <Button
            title="Guardar Cambios"
            onPress={actualizarCategoria}
            style={styles.button}
          />
        ) : (
          <Button
            title="Agregar Nueva Categoría"
            onPress={guardarCategoria}
            style={styles.button}
          />
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cerrarModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¿Qué deseas hacer?</Text>
            <View style={styles.modalControler}>
              <View style={styles.buttonContainer}>
                <Button
                 title="Editar"
                 onPress={() => seleccionarAccion("editar")}
                 style={styles.modalButton}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                 title="Eliminar"
                 onPress={() => seleccionarAccion("eliminar")}
                 style={styles.modalButton}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                 title="Cancelar"
                 onPress={cerrarModal}
                 style={styles.modalButton}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
 );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: "#fff",
    },
    titulo: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
    },
    fila: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 1,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    celdaID: {
      margin: 2,
      width: 30,
    },
    celda: {
      flex: 1,
      padding: 10,
      margin: 5,
    },
    acciones: {
      flexDirection: "row",
      justifyContent: "flex-end",
      width: 50,
    },
    button: {
      marginLeft: 10,
      backgroundColor: "#007bff",
      color: "#fff",
    },
    formulario: {
      marginTop: 20,
      padding: 10,
      backgroundColor: "#f8f8f8",
      borderRadius: 5,
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
      borderRadius: 5,
      width: "100%",
    },
    tituloCelda: {
      fontWeight: "bold",
      textAlign: "center",
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
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    modalControler: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    buttonContainer: {
      margin: 10,
    },
    modalButton: {
      backgroundColor: "#007bff",
      color: "#fff",
    },
  });
export default CompCategoria;
