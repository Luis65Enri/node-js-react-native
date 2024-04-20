const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const sincronizarModelos = require("./configuraciones/sincronizar-modelos.js"); //modelos creados en documento externo NUNCA Desactivar
const exp = require("constants");
const app = express();
const PORT = process.env.PORT || 3000;
app.set("port", PORT);
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false })); //comando para no encriptar la url//
app.use(express.json());
app.use(
  cors({
    origin: "*", // Permite solicitudes desde cualquier origen
    methods: ["GET", "POST", "PUT", "DELETE"], // Añade otros métodos HTTP según sea necesario
  })
);
app.use(
  "/api/img",
  express.static(path.join(__dirname, "../public/img/productos"))
);
app.get("/", (req, res) => {
  res.send("Hola Mundo");
});
app.use(
  "/api/usuarios",
  express.static(path.join(__dirname, "../public/img/usuarios"))
);
app.use("/api/imagenes/usuarios", express.static(path.join(__dirname, "public/img/usuarios")));
app.use("/api/imagenes/productos",express.static(path.join(__dirname,"./public/img/productos")));
//-----Rutas-----//
app.use("/api/", require("./rutas"));
app.use("/api/rol", require("./rutas/ruta_rol-cuenta"));
app.use("/api/usuario", require("./rutas/ruta_usuario"));
app.use("/api/proveedor", require("./rutas/ruta_proveedores"));
app.use("/api/categoria", require("./rutas/ruta_categorias"));
app.use("/api/servicio", require("./rutas/ruta_servicios"));
app.use("/api/marca", require("./rutas/ruta_marca"));
app.use("/api/producto", require("./rutas/ruta_producto"));
app.use("/api/facturas/venta", require("./rutas/ruta_factura_venta"));
app.use("/api/facturas/compra", require("./rutas/ruta_factura_compra"));
app.use(
  "/api/facturas/detalle-venta",
  require("./rutas/ruta_detalle_factura_venta.js")
);
app.use(
  "/api/facturas/detalle-compra",
  require("./rutas/ruta_detalle_factura_compra.js")
);
app.use("/inicio", require("./rutas/ruta_login"));
app.use("/api/autenticacion", require("./rutas/ruta_Autenticacion"));
//-----Fin rutas-----//
app.listen(app.get("port"), () => {
  console.log("Servidor iniciado en el puerto " + app.get("port"));
});
