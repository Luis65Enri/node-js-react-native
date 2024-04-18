export default (estado, accion) => {
  const { datos, acciones } = accion;
  switch (acciones) {
    case "SET_LOGIN":
      return {
        ...estado,
        ...datos,
      };
    case "VERIFICAR_USUARIO":
      return {
        ...estado,
        ...datos,
      };
    case "CARGAR_DATOS":
      return {
        ...estado,
        ...datos,
      };
    case "ACTUALIZAR_DATOS":
      return {
        ...estado,
        token: datos.token,
        usuario: datos.usuario,
        sesionIniciada: datos.sesionIniciada,
        tokenValidado: datos.tokenValidado,
        aplicacionIniciada: true,
      };
    case "ACTUALIZAR_USUARIO":
      return {
        ...estado,
        usuario: datos.usuario,
      };
    case "VALIDAR_TOKEN":
      return {
        ...estado,
        tokenValidado: true,
      };
    default:
      return estado;
  }
};
