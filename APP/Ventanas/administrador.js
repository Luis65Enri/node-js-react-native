import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import React, { useContext } from "react";
import { Image, Text, View } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import UserContext from "../src/context/role";
import CompCategoria from "./OpcionesAdmin/categorias";
import CompMarca from "./OpcionesAdmin/marca";
import CompProductos from "./OpcionesAdmin/productos";
import CompProveedor from "./OpcionesAdmin/proveedor";
import CompRol from "./OpcionesAdmin/rol";
import CompServicios from "./OpcionesAdmin/servicios";

const Drawer = createDrawerNavigator();
const CompAdmin = () => {
  const { userData } = useContext(UserContext);
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
              {userData.imagen && (
                <Image
                  source={{ uri: userData.imagen }}
                  style={{
                    height: 130,
                    width: 130,
                    borderRadius: 65,
                  }}
                />
              )}
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#111",
                }}
              >
                {userData.nombre} {""}
                {userData.apellido}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#111",
                }}
              >
                {userData.correoElectronico}
              </Text>
            </View>
            <DrawerItemList {...props} />
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
        name="Home"
        options={{
          drawerLabel: "Productos",
          title: "Home",
          drawerIcon: () => (
            <MaterialIcons
              name="production-quantity-limits"
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
              name="keyboard-control-key"
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
