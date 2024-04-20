const { Model } = require("sequelize");
const modelo = require("../modelos/modelo_producto");
const { validationResult } = require("express-validator");
const multer = require("multer");
const fs = require("fs");
const { Op } = require("sequelize");
const path = require("path");
const { guardarImagenProducto } = require("../configuraciones/archivos");

exports.inicio = (req, res) => {
  const objeto = {
    titulo: "Rutas de Productos",
  };
  res.json(objeto);
};

exports.guardar = async (req, res) => {
  const datos = req.body;
  const {
    nombre_producto,
    descripcion_producto,
    tipo_producto,
    precio_producto,
    stock_producto,
    categoriaId,
    servicioId,
    marcaId,
  } = req.body;
  await modelo
    .create({
      nombre_producto: nombre_producto,
      descripcion_producto: descripcion_producto,
      tipo_producto: tipo_producto,
      precio_producto: precio_producto,
      stock_producto: stock_producto,
      categoriaId: categoriaId,
      servicioId: servicioId,
      marcaId: marcaId,
    })
    .then((data) => {
      res.json(data);
    })
    .catch((er) => {
      res.json(er);
    });
};
exports.listar = async (req, res) => {
  const lista = await modelo.findAll();
  res.json(lista);
};
exports.editar = async (req, res) => {
  const { id } = req.query;
  const {
    nombre_producto,
    descripcion_producto,
    tipo_producto,
    precio_producto,
    stock_producto,
    categoriaId,
    servicioId,
    marcaId,
  } = req.body;
  try {
    var buscar_producto = await modelo.findOne({ where: { id: id } });
    console.log(buscar_producto);
    if (!buscar_producto) {
      res.json({ msj: "EL nombre del producto no existe" });
    } else {
      buscar_producto.nombre_producto = nombre_producto;
      buscar_producto.descripcion_producto = descripcion_producto;
      buscar_producto.tipo_producto = tipo_producto;
      buscar_producto.precio_producto = precio_producto;
      buscar_producto.stock_producto = stock_producto;
      buscar_producto.categoriaId = categoriaId;
      buscar_producto.servicioId = servicioId;
      buscar_producto.marcaId = marcaId;
      await buscar_producto
        .save()
        .then((data) => {
          res.json(data);
        })
        .catch((er) => {
          res.json(er);
        });
    }
  } catch (error) {
    console.log(error);
    res.json({ msj: "Error en el servidor" });
  }
};
exports.eliminar = async (req, res) => {
  const { id } = req.query;
  const validacion = validationResult(req);
  if (validacion.errors.length > 0) {
    var msjerror = "";
    validacion.errors.forEach((r) => {
      msjerror = msjerror + r.msg + ". ";
    });
    res.json({ msj: "Hay errores en la petición", error: msjerror });
  } else {
    try {
      var busqueda = await modelo.findOne({ where: { id: id } });
      console.log(busqueda);
      if (!busqueda) {
        res.json({ msj: "El id no existe" });
      } else {
        await modelo
          .destroy({ where: { id: id } })
          .then((data) => {
            res.json({ msj: "Registro eliminado", data: data });
          })
          .catch((er) => {
            res.json(er);
          });
      }
    } catch (error) {
      res.json(error);
    }
  }
};
//filtros
exports.busqueda = async (req, res) => {
  const validacion = validationResult(req);
  if (validacion.errors.length > 0) {
    var msjerror = "";
    validacion.errors.forEach((r) => {
      msjerror = msjerror + r.msg + ". ";
    });
    res.json({ msj: "Hay errores en la petición", error: msjerror });
  } else {
    try {
      const whereClause = {};
      if (req.query.id) whereClause.id = req.query.id;
      if (req.query.nombre) whereClause.nombre_producto = req.query.nombre;
      if (req.query.tipo) whereClause.tipo_producto = req.query.tipo;
      if (req.query.categoria) whereClause.categoriaId = req.query.categoria;
      if (req.query.servicio) whereClause.servicioId = req.query.servicio;
      if (req.query.marca) whereClause.marcaId = req.query.marca;
      const busqueda = await modelo.findAll({
        where: { [Op.or]: whereClause },
      });
      res.json(busqueda);
    } catch (error) {
      res.json(error);
    }
  }
};
exports.busqueda_id = async (req, res) => {
  const validacion = validationResult(req);
  if (validacion.errors.length > 0) {
    var msjerror = "";
    validacion.errors.forEach((r) => {
      msjerror = msjerror + r.msg + ". ";
    });
    res.json({ msj: "Hay errores en la petición", error: msjerror });
  } else {
    try {
      const busqueda = await modelo.findOne({ where: { id: req.query.id } });
      res.json(busqueda);
    } catch (error) {
      res.json(error);
    }
  }
};
exports.busqueda_nombre = async (req, res) => {
  const validacion = validationResult(req);
  if (validacion.errors.length > 0) {
    var msjerror = "";
    validacion.errors.forEach((r) => {
      msjerror = msjerror + r.msg + ". ";
    });
    res.json({ msj: "Hay errores en la petición", error: msjerror });
  } else {
    try {
      const busqueda = await modelo.findAll({
        where: { nombre_producto: req.query.nombre },
      });
      res.json(busqueda);
    } catch (error) {
      res.json(error);
    }
  }
};

//antiguos
exports.busqueda_old = async (req, res) => {
  const id = req.query.id;
  const nombre = req.query.nombre;

  try {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      var msjerror = validacion.errors.map((error) => error.msg).join(". ");
      return res.json({
        mensaje: "Hay errores en la petición",
        error: msjerror,
      });
    }

    let listarProductos;
    if (id && !nombre) {
      listarProductos = await ModeloProductos.findAll({
        where: { id: id },
      });
    } else if (nombre && !id) {
      listarProductos = await ModeloProductos.findAll({
        where: { nombre_producto: nombre },
      });
    } else {
      return res.json({
        mensaje: "Debes proporcionar solo ID o solo nombre para la búsqueda",
      });
    }
    res.json(listarProductos);
  } catch (error) {
    res.json(error);
  }
};
//guardar-imagen
exports.validarImagen = (req, res, next) => {
  const validacion = validationResult(req);
  if (validacion.errors.length > 0) {
    var msjerror = "";
    validacion.errors.forEach((r) => {
      msjerror = msjerror + r.msg + ". ";
    });
    res.json({ msj: "Hay errores en la petición", error: msjerror });
  } else {
    guardarImagenProducto(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          return res.json({
            msj: "Hay errores al cargar la imagen",
            error: err.message,
          });
        } else {
          return res.json({
            msj: "Error al cargar la imagen",
            error: err.message,
          });
        }
      } else {
        next();
      }
    });
  }
};
//Codigo anterior mostrado en clase
exports.actualizarimagen = async (req, res) => {
  const validacion = validationResult(req);
  if (validacion.errors.length > 0) {
    var msjerror = "";
    validacion.errors.forEach((r) => {
      msjerror = msjerror + r.msg + ". ";
    });
    res.json({ msj: "Hay errores en la petición", error: msjerror });
  } else {
    const { id } = req.query;
    const nombreImagen = req.file.filename;
    var buscar_producto = await modelo.findOne({ wehe: { id: id } });
    if (!buscar_producto) {
      res.json({ msj: "El id del empleado no existe" });
    } else {
      const imagenAnterior = fs.existsSync(
        path.join(
          __dirname,
          "../../public/img/productos/" + buscar_producto.imagen
        )
      );
      if (imagenAnterior) {
        fs.unlinkSync(
          path.join(
            __dirname,
            "../../public/img/productos/" + buscar_producto.imagen
          )
        );
        console.log("Imagen eliminada");
      }
      const imagenNueva = fs.existsSync(
        path.join(__dirname, "../../public/img/productos/" + nombreImagen)
      );
      if (imagenNueva) {
        buscar_producto.imagen = nombreImagen;
        buscar_producto
          .save()
          .then((data) => {
            res.json(data);
          })
          .catch((er) => {
            res.json(er);
          });
        console.log("Imagen actualizada");
      } else {
        res.json({ mjs: " No se actualizo la imagen en la base de datos" });
      }
    }
  }
};
exports.actualizarimagenes = async (req, res) => {
  const validacion = validationResult(req);
  if (validacion.errors.length > 0) {
    var msjerror = "";
    validacion.errors.forEach((r) => {
      msjerror = msjerror + r.msg + ". ";
    });
    res.json({ msj: "Hay errores en la petición", error: msjerror });
  } else {
    const { id } = req.query;
    if (!req.file || !id) {
      return res.json({ msj: "Falta la imagen o el ID en la petición" });
    }
    const nombreImagen = req.file.filename;
    try {
      const producto = await modelo.findOne({ where: { id: id } });
      if (!producto) {
        return res.json({
          msj: "El producto con el ID proporcionado no existe",
        });
      }
      if (producto.imagen) {
        const rutaImagenAnterior = path.join(
          __dirname,
          "../../public/img/productos/",
          producto.imagen
        );
        if (fs.existsSync(rutaImagenAnterior)) {
          fs.unlinkSync(rutaImagenAnterior);
          console.log("Imagen anterior eliminada");
        }
      }

      producto.imagen = nombreImagen;
      await producto.save();

      console.log("Imagen actualizada en la base de datos");
      return res.json({
        msj: "Imagen actualizada exitosamente",
        nuevaImagen: nombreImagen,
      });
    } catch (error) {
      console.error("Error al actualizar la imagen:", error);
      return res.json({
        msj: "Error interno del servidor al actualizar la imagen",
      });
    }
  }
};
exports.GuardarImagen = async (req, res) => {
  const { filename } = req.file;
  const id = req.user;
  console.log(`Filename: ${filename}, User ID: ${id}`);

  var buscarProducto = await modelo.findOne({
    where: { id: id },
  });

  if (buscarProducto) {
    console.log("Producto encontrado:", buscarProducto);
    const buscarImagen = fs.existsSync(
      path.join(__dirname, "../public/img/productos/" + buscarProducto.imagen)
    );
    if (buscarImagen) {
      fs.unlinkSync(
        path.join(__dirname, "../public/img/productos" + buscarProducto.imagen)
      );
      console.log("Imagen anterior eliminada");
    } else {
      console.log("El producto no tiene imagen asignada");
    }

    buscarProducto.imagen = filename;
    await buscarProducto
      .save()
      .then((data) => {
        console.log("Usuario actualizado:", data);
        res.json({
          msj: "Imagen guardada y asignada al producto",
          imagen: data.imagen,
        });
      })
      .catch((err) => {
        console.error("Error al actualizar el usuario:", err);
        res.json({ msj: "Error al actualizar la imagen del producto" });
      });
  } else {
    console.log("Usuario no encontrado");
    const buscarImagen = fs.existsSync(
      path.join(__dirname, "../public/img/productos" + filename)
    );
    if (buscarImagen) {
      fs.unlinkSync(path.join(__dirname, "../public/img/productos" + filename));
      console.log("Imagen eliminada");
    } else {
      console.log("No existe la imagen");
    }
    res.json({ msj: "El id del producto no existe" });
  }
};
