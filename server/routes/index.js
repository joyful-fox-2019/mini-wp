const routes = require('express').Router()
const articleRoutes = require('./article')
const userRoutes = require('./user')

routes.get('/',(req,res,next)=>{
    res.status(200).json('your server is connect')
})

routes.use('/article',articleRoutes)
routes.use('/user',userRoutes)

module.exports = routes