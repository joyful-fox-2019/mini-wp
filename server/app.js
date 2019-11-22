if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const PORT = process.env.PORT
const MONGODB = process.env.MONGODB_URL

const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))
app.use(cors())

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(err => {
    console.log('could not connect to mongodb')
  })

app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('listening to port ' + PORT)
})