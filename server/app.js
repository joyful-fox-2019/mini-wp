if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const PORT = process.env.PORT
const cors = require('cors')
const mongoose = require('./config/mongoose')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

mongoose()

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cors())

app.use('/', routes)

app.use(errorHandler)


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))