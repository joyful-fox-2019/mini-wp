if (process.env.NODE_ENV === 'development'){
  require('dotenv').config()
} 
  
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const PORT = process.env.PORT || 300

app.use(express.json())
app.use(express.urlencoded({extended : false}))

mongoose.connect('mongodb://localhost:27017/miniWPLocal', {useNewUrlParser: true,useUnifiedTopology : true,useCreateIndex: true})
  .then((sucess)=>{
    console.log(`Connected on miniWPLocal`)
  })
  .catch((err)=>{
    console.log(err)
  })

app.use(cors())
app.use(morgan('dev'))

app.use(('/'),routes)


app.use(errorHandler)



app.listen(PORT,()=> console.log(`up and running on ${PORT}`))

