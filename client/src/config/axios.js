import axios from "axios"

const axiosServer = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        token: localStorage.getItem("token"),
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email")
    }
})

export default axiosServer