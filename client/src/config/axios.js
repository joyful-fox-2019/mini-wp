import axios from "axios";

const miniwp = axios.create({
    baseURL: `http://localhost:3000`,
    headers: {
      "jwt_token": localStorage.getItem("token")
    }
})

export default miniwp;