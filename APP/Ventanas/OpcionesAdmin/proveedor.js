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
import { urlProveedor } from "../../src/config/urls";
const CompProveedor = () => {
  const [proveedores, setProveedores] = useState([]);
  const [nuevoNombreProveedor, setNuevoNombreProveedor] = useState("");
  const [nuevoContactoProveedor, setNuevoContactoProveedor] = useState("");
  const [nuevaDireccionProveedor, setNuevaDireccionProveedor] = useState("");
  const [
    nuevoCodigoPaisTelefonoProveedor,
    setNuevoCodigoPaisTelefonoProveedor,
  ] = useState("");
  const [nuevoTelefonoProveedor, setNuevoTelefonoProveedor] = useState("");
  const [proveedorEnEdicion, setProveedorEnEdicion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const buscarProveedores = async () => {
    try {
      let proveedoresResultantes = [];

      if (busqueda === "") {
        const response = await axios.get(`${urlProveedor}/listar`);
        proveedoresResultantes = Array.isArray(response.data)
          ? response.data
          : [];
      } else {
        const params = {
          nombre: busqueda,
          contacto: busqueda,
          telefono: busqueda, 
        };
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([key, value]) => value)
        );

        const response = await axios.get(`${urlProveedor}/buscar`, {
          params: filteredParams,
        });

        proveedoresResultantes = Array.isArray(response.data)
          ? response.data
          : [];
      }

      setProveedores(proveedoresResultantes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    buscarProveedores();
  }, [busqueda]);

  useEffect(() => {
    const obtenerProveedores = async () => {
      try {
        const response = await axios.get(urlProveedor + "/listar");
        setProveedores(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    obtenerProveedores();
  }, []);

  useEffect(() => {
    if (nuevoNombreProveedor === "") {
      setProveedorEnEdicion(null);
    }
  }, [nuevoNombreProveedor]);

  const guardarProveedor = async () => {
    try {
      const response = await axios.post(urlProveedor + "/guardar", {
        nombre_proveedor: nuevoNombreProveedor,
        contacto_proveedor: nuevoContactoProveedor,
        direccion_proveedor: nuevaDireccionProveedor,
        codigo_pais_telefono_proveedor: nuevoCodigoPaisTelefonoProveedor,
        telefono_proveedor: nuevoTelefonoProveedor,
      });
      setProveedores([...proveedores, response.data]);
      limpiarCampos();
    } catch (error) {
      console.error(error);
    }
  };

  const editarProveedor = async (id) => {
    const proveedor = proveedores.find((proveedor) => proveedor.id === id);
    if (proveedor) {
      setNuevoNombreProveedor(proveedor.nombre_proveedor);
      setNuevoContactoProveedor(proveedor.contacto_proveedor);
      setNuevaDireccionProveedor(proveedor.direccion_proveedor);
      setNuevoCodigoPaisTelefonoProveedor(
        proveedor.codigo_pais_telefono_proveedor
      );
      setNuevoTelefonoProveedor(proveedor.telefono_proveedor);
      setProveedorEnEdicion(proveedor);
    }
  };

  const actualizarProveedor = async () => {
    try {
      const response = await axios.put(
        `${urlProveedor}/editar?id=${proveedorEnEdicion.id}`,
        {
          nombre_proveedor: nuevoNombreProveedor,
          contacto_proveedor: nuevoContactoProveedor,
          direccion_proveedor: nuevaDireccionProveedor,
          codigo_pais_telefono_proveedor: nuevoCodigoPaisTelefonoProveedor,
          telefono_proveedor: nuevoTelefonoProveedor,
        }
      );
      setProveedores(
        proveedores.map((proveedor) =>
          proveedor.id === proveedorEnEdicion.id ? response.data : proveedor
        )
      );
      limpiarCampos();
      setProveedorEnEdicion(null);
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarProveedor = async (id) => {
    try {
      const response = await axios.delete(`${urlProveedor}/eliminar?id=${id}`);
      console.log(response.data);
      setProveedores(proveedores.filter((proveedor) => proveedor.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const limpiarCampos = () => {
    setNuevoNombreProveedor("");
    setNuevoContactoProveedor("");
    setNuevaDireccionProveedor("");
    setNuevoCodigoPaisTelefonoProveedor("");
    setNuevoTelefonoProveedor("");
    setProveedorEnEdicion(null);
  };

  const abrirModal = (id) => {
    setProveedorSeleccionado(id);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const seleccionarAccion = (accion) => {
    if (accion === "editar") {
      editarProveedor(proveedorSeleccionado);
    } else if (accion === "eliminar") {
      eliminarProveedor(proveedorSeleccionado);
    } else if (accion === "cancelar") {
      cerrarModal();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar Proveedor por Nombre"
        onChangeText={(text) => setBusqueda(text)}
        value={busqueda}
      />
      <FlatList
        data={proveedores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.fila}>
            <View style={styles.celdaID}>
              <Text>{item.id}</Text>
            </View>
            <View style={styles.celda}>
              <Text>{item.nombre_proveedor}</Text>
            </View>
            <View style={styles.celda}>
              <Text>{item.direccion_proveedor}</Text>
            </View>
            <View style={styles.celda}>
              <Text>{item.codigo_pais_telefono_proveedor}</Text>
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
          placeholder="Nombre de Proveedor"
          onChangeText={setNuevoNombreProveedor}
          value={nuevoNombreProveedor}
        />
        <TextInput
          style={styles.input}
          placeholder="Contacto de Proveedor"
          onChangeText={setNuevoContactoProveedor}
          value={nuevoContactoProveedor}
        />
        <TextInput
          style={styles.input}
          placeholder="Dirección de Proveedor"
          onChangeText={setNuevaDireccionProveedor}
          value={nuevaDireccionProveedor}
        />
        <TextInput
          style={styles.input}
          placeholder="Código de País y Teléfono de Proveedor"
          onChangeText={setNuevoCodigoPaisTelefonoProveedor}
          value={nuevoCodigoPaisTelefonoProveedor}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono de Proveedor"
          onChangeText={setNuevoTelefonoProveedor}
          value={nuevoTelefonoProveedor}
        />
        {proveedorEnEdicion ? (
          <Button
            title="Guardar Cambios"
            onPress={actualizarProveedor}
            style={styles.button}
          />
        ) : (
          <Button
            title="Agregar Nuevo Proveedor"
            onPress={guardarProveedor}
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
    marginBottom: 10,
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
    width: 60,
    marginRight: 10,
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
export default CompProveedor;
