import axios from "axios";

const miniwp = axios.create({
    baseURL: `http://miniwp.server.edirates.xyz`,
    headers: {
      "jwt_token": localStorage.getItem("token")
    }
})

export default miniwp;