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
import { urlMarca } from "../../src/config/urls";

const CompMarca = () => {
  const [marcas, setMarcas] = useState([]);
  const [nuevoNombreMarca, setNuevoNombreMarca] = useState("");
  const [marcaEnEdicion, setMarcaEnEdicion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const buscarMarcas = async () => {
    try {
      let marcasResultantes = [];

      if (busqueda === "") {
        const response = await axios.get(`${urlMarca}/listar`);
        marcasResultantes = Array.isArray(response.data) ? response.data : [];
      } else {
        const responseNombre = await axios.get(`${urlMarca}/buscar`, {
          params: {
            marca: busqueda,
          },
        });
        const responseId = await axios.get(`${urlMarca}/buscar`, {
          params: {
            id: busqueda,
          },
        });

        marcasResultantes = [
          ...(Array.isArray(responseNombre.data) ? responseNombre.data : []),
          ...(Array.isArray(responseId.data) ? responseId.data : []),
        ];

        marcasResultantes = Array.from(
          new Set(marcasResultantes.map((marca) => marca.id))
        ).map((id) => marcasResultantes.find((marca) => marca.id === id));
      }

      setMarcas(marcasResultantes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    buscarMarcas();
  }, [busqueda]);

  useEffect(() => {
    const obtenerMarcas = async () => {
      try {
        const response = await axios.get(urlMarca + "/listar");
        setMarcas(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    obtenerMarcas();
  }, []);

  useEffect(() => {
    if (nuevoNombreMarca === "") {
      setMarcaEnEdicion(null);
    }
  }, [nuevoNombreMarca]);

  const guardarMarca = async () => {
    try {
      const response = await axios.post(urlMarca + "/guardar", {
        nombre_marca: nuevoNombreMarca,
      });
      setMarcas([...marcas, response.data]);
      limpiarCampos();
    } catch (error) {
      console.error(error);
    }
  };

  const editarMarca = async (id) => {
    const marca = marcas.find((marca) => marca.id === id);
    if (marca) {
      setNuevoNombreMarca(marca.nombre_marca);
      setMarcaEnEdicion(marca);
    }
  };

  const actualizarMarca = async () => {
    try {
      const response = await axios.put(
        `${urlMarca}/editar?id=${marcaEnEdicion.id}`,
        {
          nombre_marca: nuevoNombreMarca,
        }
      );
      setMarcas(
        marcas.map((marca) =>
          marca.id === marcaEnEdicion.id ? response.data : marca
        )
      );
      limpiarCampos();
      setMarcaEnEdicion(null);
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarMarca = async (id) => {
    try {
      const response = await axios.delete(`${urlMarca}/eliminar?id=${id}`);
      console.log(response.data);
      setMarcas(marcas.filter((marca) => marca.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const limpiarCampos = () => {
    setNuevoNombreMarca("");
    setMarcaEnEdicion(null);
  };

  const abrirModal = (id) => {
    setMarcaSeleccionada(id);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const seleccionarAccion = (accion) => {
    if (accion === "editar") {
      editarMarca(marcaSeleccionada);
    } else if (accion === "eliminar") {
      eliminarMarca(marcaSeleccionada);
    } else if (accion === "cancelar") {
      cerrarModal();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar Marca por Nombre"
        onChangeText={(text) => setBusqueda(text)}
        value={busqueda}
      />
      <FlatList
        data={marcas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.fila}>
            <View style={styles.celdaID}>
              <Text>{item.id}</Text>
            </View>
            <View style={styles.celda}>
              <Text>{item.nombre_marca}</Text>
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
          placeholder="Nombre de Marca"
          onChangeText={setNuevoNombreMarca}
          value={nuevoNombreMarca}
        />
        {marcaEnEdicion ? (
          <Button
            title="Guardar Cambios"
            onPress={actualizarMarca}
            style={styles.button}
          />
        ) : (
          <Button
            title="Agregar Nueva Marca"
            onPress={guardarMarca}
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

export default CompMarca;
