
import axios from "axios";

export const axioInstance = axios.create({
     baseURL: 'http://localhost:8000/api',
    withCredentials: true, // Envía cookies
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
})
