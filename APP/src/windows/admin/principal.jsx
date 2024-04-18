import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Button, Text, View } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CompCategoria from "../../../Ventanas/OpcionesAdmin/categorias";
import CompMarca from "../../../Ventanas/OpcionesAdmin/marca";
import CompProductos from "../../../Ventanas/OpcionesAdmin/productos";
import CompProveedor from "../../../Ventanas/OpcionesAdmin/proveedor";
import CompRol from "../../../Ventanas/OpcionesAdmin/rol";
import CompServicios from "../../../Ventanas/OpcionesAdmin/servicios";
import UsuarioContext from "../../context/Usuario/usuarioContext";
import EstilosLogin from "../../styles/estilosLogin";
import PerfilUsuario from "../perfilUsuario";
const Drawer = createDrawerNavigator();
const CompAdmin = () => {
  const navigation = useNavigation();
  const { setCerrarSesion, sesionIniciada } = useContext(UsuarioContext);
  const [espera, setEspera] = useState(false);
  const cerrarSesion = async () => {
    setEspera(true);
    await setCerrarSesion();
    setEspera(false);
    navigation.navigate("Login");
  };
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBlockWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#111",
                }}
              ></Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#111",
                }}
              ></Text>
            </View>
            <DrawerItemList {...props} />
            <View style={EstilosLogin.contenedorBotones}>
              <Button
                title="Cerrar sesión"
                color="blue"
                onPress={() => cerrarSesion(navigation)}
                disabled={espera}
                style={{ alignSelf: "stretch" }}
              />
            </View>
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          width: 250,
          borderRadius: 10,
        },
        headerStyle: {
          backgroundColor: "#3240FF",
          borderBottomColor: "#f4f4f4",
          borderBottomWidth: 1,
        },
        headerPressColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerActiveTintColor: "blue",
        drawerLabelStyle: {
          color: "#111",
        },
      }}
    >
      <Drawer.Screen
        name="Peril"
        options={{
          drawerLabel: "Perfil",
          title: "Home",
          drawerIcon: () => (
            <MaterialIcons
              name="design-services"
              size={20}
              color={"#573EFF"}
            />
          ),
        }}
        component={PerfilUsuario}
      />
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: "Productos",
          title: "Home",
          drawerIcon: () => (
            <MaterialIcons
              name="design-services"
              size={20}
              color={"#573EFF"}
            />
          ),
        }}
        component={CompProductos}
      />
      <Drawer.Screen
        name="Proveedor"
        options={{
          drawerLabel: "Proveedor",
          title: "Home",
          drawerIcon: () => (
            <MaterialIcons name="approval" size={20} color={"#573EFF"} />
          ),
        }}
        component={CompProveedor}
      />
      <Drawer.Screen
        name="Categoria"
        options={{
          drawerLabel: "Categoria",
          title: "Home",
          drawerIcon: () => (
            <MaterialIcons name="category" size={20} color={"#573EFF"} />
          ),
        }}
        component={CompCategoria}
      />
      <Drawer.Screen
        name="Servicios"
        options={{
          drawerLabel: "Servicios",
          title: "Home",
          drawerIcon: () => (
            <MaterialIcons name="design-services" size={20} color={"#573EFF"} />
          ),
        }}
        component={CompServicios}
      />
      <Drawer.Screen
        name="Marcas"
        options={{
          drawerLabel: "Marcas",
          title: "Home",
          drawerIcon: () => (
            <MaterialIcons
              name="branding-watermark"
              size={20}
              color={"#573EFF"}
            />
          ),
        }}
        component={CompMarca}
      />
      <Drawer.Screen
        name="Roles"
        options={{
          drawerLabel: "Roles",
          title: "Home",
          drawerIcon: () => (
            <MaterialIcons
              name="design-services"
              size={20}
              color={"#573EFF"}
            />
          ),
        }}
        component={CompRol}
      />
    </Drawer.Navigator>
  );
};

export default CompAdmin;