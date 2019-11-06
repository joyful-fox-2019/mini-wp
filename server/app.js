require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = process.env.PORT || 3000
const DB_URI = 'mongodb://localhost/mini-wp-luky'
const routes = require('./routes')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(DB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true,
  useCreateIndex: true, useFindAndModify: false
})
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(err => {
    console.log('could not connect to mongodb')
  })

app.get('/hello', (req, res) => {
  res.send('Hello World')
})

app.use('/', routes)
app.listen(PORT, () => {
  console.log('listening to port ' + PORT)
})

