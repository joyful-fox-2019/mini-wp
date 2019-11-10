if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')
const errorHandler = require('./errorHandler')

const port = process.env.PORT || 3000

const app = express()
mongoose.connect('mongodb://localhost/mini-wp', 
{ useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true, 
  useFindAndModify: false })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/', routes)
app.use(errorHandler)

app.listen(port, () => {
  console.log('listening to port', port);
})