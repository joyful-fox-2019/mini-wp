import axios from 'axios'

// DEVELOPMENT
const server = 'http://localhost:3000'

// DEPLOYED
// const server = 'http://wordride.mardii.site'

const instance = axios.create({
  baseURL: server
})

export default instance