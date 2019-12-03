import axios from 'axios'

const axiosServer = axios.create({
    baseURL: `http://34.87.6.238`,
    headers: {
      "accesstoken": localStorage.getItem('token')
    }
})

export default axiosServer