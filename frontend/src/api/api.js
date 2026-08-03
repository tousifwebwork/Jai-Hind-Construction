
import axios from "axios";

const API = axios.create({ 
baseURL: import.meta.env.DEV? 
        import.meta.env.VITE_BACK_DEV_URL: import.meta.env.VITE_BACK_PROD_URL
});

export default API;