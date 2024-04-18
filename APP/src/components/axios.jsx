import axios from "axios";
import { urlAPI } from "../config/urls";

const Axios = axios.create({
  baseURL: urlAPI,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
export default Axios;
