const routes = require('express').Router();
const userRouter = require('./user');
const articleRouter = require("./article");

routes.use('/user', userRouter)
routes.use("/article", articleRouter)


module.exports = routes