`use strict`
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
//list of modules used
const express = require('express') // untuk express
const mongoose = require('mongoose') // untuk mongoose
const morgan = require('morgan') // untuk morgan
const cors = require('cors') // untuk cors

// list of used const
const errorHandler = require('./middlewares/errorHandler') // router untuk user
const router = require('./routes')
const app = express()
const port = process.env.port || 3000

// connect to mongoose
mongoose.connect('mongodb://localhost/mini_wp', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false, useCreateIndex: true })
    .then(resolve => {
        console.log(`server is connected !!`)
    })
    .catch( err => {
        console.log(err)
    })

// connect to express
app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(cors())
app.use(morgan('dev'))

app.use('/', router)
app.use(errorHandler)
app.listen(port, () => {
    console.log(`running on port ${port}`)
})





