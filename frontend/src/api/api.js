
import axios from "axios";

export const API_URL = "http://localhost:3000/api";

const API = axios.create({ baseURL: API_URL });

export default API;