import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://ggwp-server.karlinevans333.site'
});

export default instance