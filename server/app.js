const dotenv = () => {
  if(process.env.NODE_ENV === 'development') require('dotenv').config()
}

dotenv()

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const port = process.env.PORT || 3000
const uri = process.env.MONGO_URI

//  DB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => { console.log('connected to database')})
  .catch(() => { console.log('failed to connect to database')})

//  Middlewares

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)

app.use(errorHandler)

app.listen(port, () => { console.log(`listening to port ${port}`)})
