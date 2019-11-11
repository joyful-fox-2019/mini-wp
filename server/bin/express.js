const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = express.Router()
const listen = () =>{
    app.listen(port,(_=>{ console.log('youre running in port',port)}))
}
module.exports = {
    listen,
    app,
    express,
    routes
}