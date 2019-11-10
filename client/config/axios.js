const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://myminiwp-server.nadhiljanitra.xyz'
})

module.exports = instance