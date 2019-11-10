import axios from 'axios'
const token = localStorage.getItem('token')

const axiosNpm = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    access_token: token
  }
})

export default axiosNpm