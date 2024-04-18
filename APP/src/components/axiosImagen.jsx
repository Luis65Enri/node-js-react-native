import axios from "axios";
import { urlAPI } from "../config/urls";

const AxiosImagen = axios.create({
  baseURL: urlAPI,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "content-type": "multipart/form-data",
  },
});

export default AxiosImagen;
