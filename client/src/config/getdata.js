import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://miniwpserver.dipaproject.online/',
})

export default instance