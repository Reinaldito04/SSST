
import axios from "axios";

export const axioInstance = axios.create({
    baseURL: 'https://k35f8sqn-8000.use2.devtunnels.ms/',
    headers: {
        "Content-Type": "application/json",
    },
})
