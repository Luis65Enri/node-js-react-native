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
import { urlServicio } from "../../src/config/urls";

const CompServicios = () => {
 const [servicios, setServicios] = useState([]);
 const [nuevoNombreServicio, setNuevoNombreServicio] = useState("");
 const [servicioEnEdicion, setServicioEnEdicion] = useState(null);
 const [modalVisible, setModalVisible] = useState(false);
 const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
 const [busqueda, setBusqueda] = useState("");

 const buscarServicios = async () => {
    try {
      let serviciosResultantes = [];

      if (busqueda === "") {
        const response = await axios.get(`${urlServicio}/listar`);
        serviciosResultantes = Array.isArray(response.data) ? response.data : [];
      } else {
        const responseNombre = await axios.get(`${urlServicio}/buscar`, {
          params: {
            nombre: busqueda,
          },
        });
        const responseId = await axios.get(`${urlServicio}/buscar`, {
          params: {
            id: busqueda,
          },
        });

        serviciosResultantes = [
          ...(Array.isArray(responseNombre.data) ? responseNombre.data : []),
          ...(Array.isArray(responseId.data) ? responseId.data : []),
        ];

        serviciosResultantes = Array.from(
          new Set(serviciosResultantes.map((servicio) => servicio.id))
        ).map((id) => serviciosResultantes.find((servicio) => servicio.id === id));
      }

      setServicios(serviciosResultantes);
    } catch (error) {
      console.error(error);
    }
 };

 useEffect(() => {
    buscarServicios();
 }, [busqueda]);

 useEffect(() => {
    const obtenerServicios = async () => {
      try {
        const response = await axios.get(urlServicio + "/listar");
        setServicios(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    obtenerServicios();
 }, []);

 useEffect(() => {
    if (nuevoNombreServicio === "") {
      setServicioEnEdicion(null);
    }
 }, [nuevoNombreServicio]);

 const guardarServicio = async () => {
    try {
      const response = await axios.post(urlServicio + "/guardar", {
        nombre_servicio: nuevoNombreServicio,
      });
      setServicios([...servicios, response.data]);
      limpiarCampos();
    } catch (error) {
      console.error(error);
    }
 };

 const editarServicio = async (id) => {
    const servicio = servicios.find((servicio) => servicio.id === id);
    if (servicio) {
      setNuevoNombreServicio(servicio.nombre_servicio);
      setServicioEnEdicion(servicio);
    }
 };

 const actualizarServicio = async () => {
    try {
      const response = await axios.put(
        `${urlServicio}/editar?id=${servicioEnEdicion.id}`,
        {
          nombre_servicio: nuevoNombreServicio,
        }
      );
      setServicios(
        servicios.map((servicio) =>
          servicio.id === servicioEnEdicion.id ? response.data : servicio
        )
      );
      limpiarCampos();
      setServicioEnEdicion(null);
    } catch (error) {
      console.error(error);
    }
 };

 const eliminarServicio = async (id) => {
    try {
      const response = await axios.delete(`${urlServicio}/eliminar?id=${id}`);
      console.log(response.data);
      setServicios(servicios.filter((servicio) => servicio.id !== id));
    } catch (error) {
      console.error(error);
    }
 };

 const limpiarCampos = () => {
    setNuevoNombreServicio("");
    setServicioEnEdicion(null);
 };

 const abrirModal = (id) => {
    setServicioSeleccionado(id);
    setModalVisible(true);
 };

 const cerrarModal = () => {
    setModalVisible(false);
 };

 const seleccionarAccion = (accion) => {
    if (accion === "editar") {
      editarServicio(servicioSeleccionado);
    } else if (accion === "eliminar") {
      eliminarServicio(servicioSeleccionado);
    } else if (accion === "cancelar") {
      cerrarModal();
    }
 };

 return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar Servicio por Nombre"
        onChangeText={(text) => setBusqueda(text)}
        value={busqueda}
      />
      <FlatList
        data={servicios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.fila}>
            <View style={styles.celdaID}>
              <Text>{item.id}</Text>
            </View>
            <View style={styles.celda}>
              <Text>{item.nombre_servicio}</Text>
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
          placeholder="Nombre de Servicio"
          onChangeText={setNuevoNombreServicio}
          value={nuevoNombreServicio}
        />
        {servicioEnEdicion ? (
          <Button
            title="Guardar Cambios"
            onPress={actualizarServicio}
            style={styles.button}
          />
        ) : (
          <Button
            title="Agregar Nuevo Servicio"
            onPress={guardarServicio}
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
export default CompServicios;
