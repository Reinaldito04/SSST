
import axios from "axios";

export const axioInstance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        "Content-Type": "application/json",
    },
})
