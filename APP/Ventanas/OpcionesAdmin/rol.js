import axios from "axios";
import React, { useEffect, useState } from "react";
import {
 Button,
 FlatList,
 SafeAreaView,
 StyleSheet,
 Text,
 TextInput,
 View,
} from "react-native";
import { urlRol } from "../../src/config/urls";

const CompRol = () => {
 const [roles, setRoles] = useState([]);
 const [nuevoTipoRol, setNuevoTipoRol] = useState("");
 const [nuevaDescripcionRol, setNuevaDescripcionRol] = useState("");
 const [rolEnEdicion, setRolEnEdicion] = useState(null);

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
       const response = await axios.put(`${urlRol}/editar?id=${rolEnEdicion.id}`, {
         tipo_rol: nuevoTipoRol,
         descripcion_rol: nuevaDescripcionRol,
       });
       setRoles(roles.map(rol => rol.id === rolEnEdicion.id ? response.data : rol));
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
       setRoles(roles.filter(rol => rol.id !== id));
    } catch (error) {
       console.error(error);
    }
   };

   const limpiarCampos = () => {
     setNuevoTipoRol("");
     setNuevaDescripcionRol("");
     setRolEnEdicion(null);
   };
   
 return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Roles</Text>
      <FlatList
        data={roles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.fila}>
            <View style={styles.celda}>
              <Text>{item.tipo_rol}</Text>
            </View>
            <View style={styles.celda}>
              <Text>{item.descripcion_rol}</Text>
            </View>
            <View style={styles.acciones}>
              <Button
                title="Editar"
                onPress={() => editarRol(item.id)}
                style={styles.button}
              />
              <Button
                title="Eliminar"
                onPress={() => eliminarRol(item.id)}
                style={styles.button}
              />
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
          <Button title="Guardar Cambios" onPress={actualizarRol} style={styles.button} />
        ) : (
          <Button title="Agregar Nuevo Rol" onPress={guardarRol} style={styles.button} />
        )}
      </View>
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
    paddingHorizontal: 10,
 },
 celda: {
    flex: 1,
    padding: 10,
 },
 acciones: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
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
 },
});

export default CompRol;

