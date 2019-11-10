if(process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes')

const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGOOSE_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(_=>{
    console.log('db connected');
  })
  .catch(err=>{
    console.log(err)
  })


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/', router)

app.use(errorHandler)

app.listen(port, _=>{
  console.log('listening in port', port)
})