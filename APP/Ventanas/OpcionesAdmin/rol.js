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
import { urlRol } from "../../src/config/urls";

const CompRol = () => {
  const [roles, setRoles] = useState([]);
  const [nuevoTipoRol, setNuevoTipoRol] = useState("");
  const [nuevaDescripcionRol, setNuevaDescripcionRol] = useState("");
  const [rolEnEdicion, setRolEnEdicion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [rolSeleccionado, setRolSeleccionado] = useState(null);

  useEffect(() => {
    const obtenerRoles = async () => {
      try {
        const response = await axios.get(urlRol + "/listar");
        setRoles(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    obtenerRoles();
  }, []);

  useEffect(() => {
    if (nuevoTipoRol === "" && nuevaDescripcionRol === "") {
      setRolEnEdicion(null);
    }
  }, [nuevoTipoRol, nuevaDescripcionRol]);

  const guardarRol = async () => {
    try {
      const response = await axios.post(urlRol + "/guardar", {
        tipo_rol: nuevoTipoRol,
        descripcion_rol: nuevaDescripcionRol,
      });
      setRoles([...roles, response.data]);
      limpiarCampos();
    } catch (error) {
      console.error(error);
    }
  };

  const editarRol = async (id) => {
    const rol = roles.find((rol) => rol.id === id);
    if (rol) {
      setNuevoTipoRol(rol.tipo_rol);
      setNuevaDescripcionRol(rol.descripcion_rol);
      setRolEnEdicion(rol);
    }
  };

  const actualizarRol = async () => {
    try {
      const response = await axios.put(
        `${urlRol}/editar?id=${rolEnEdicion.id}`,
        {
          tipo_rol: nuevoTipoRol,
          descripcion_rol: nuevaDescripcionRol,
        }
      );
      setRoles(
        roles.map((rol) => (rol.id === rolEnEdicion.id ? response.data : rol))
      );
      limpiarCampos();
      setRolEnEdicion(null);
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarRol = async (id) => {
    try {
      const response = await axios.delete(`${urlRol}/eliminar?id=${id}`);
      console.log(response.data);
      setRoles(roles.filter((rol) => rol.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const limpiarCampos = () => {
    setNuevoTipoRol("");
    setNuevaDescripcionRol("");
    setRolEnEdicion(null);
  };

  const abrirModal = (id) => {
    setRolSeleccionado(id);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const seleccionarAccion = (accion) => {
    if (accion === "editar") {
      editarRol(rolSeleccionado);
    } else if (accion === "eliminar") {
      eliminarRol(rolSeleccionado);
    } else if (accion === "cancelar") {
      cerrarModal();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Roles</Text>
      <FlatList
        data={roles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.fila}>
            <View style={styles.celdaID}>
              <Text>{item.id}</Text>
            </View>
            <View style={styles.celda}>
              <Text>{item.tipo_rol}</Text>
            </View>
            <View style={styles.celda}>
              <Text>{item.descripcion_rol}</Text>
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
          placeholder="Tipo de Rol"
          onChangeText={setNuevoTipoRol}
          value={nuevoTipoRol}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción del Rol"
          onChangeText={setNuevaDescripcionRol}
          value={nuevaDescripcionRol}
        />
        {rolEnEdicion ? (
          <Button
            title="Guardar Cambios"
            onPress={actualizarRol}
            style={styles.button}
          />
        ) : (
          <Button
            title="Agregar Nuevo Rol"
            onPress={guardarRol}
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
    margin:2,
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

export default CompRol;
