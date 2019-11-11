import axios from 'axios'
const token = localStorage.getItem('token')

const axiosNpm = axios.create({
  baseURL: 'http://35.247.184.111/',
  headers: {
    access_token: token
  }
})

export default axiosNpm