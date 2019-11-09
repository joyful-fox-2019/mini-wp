if(process.env.NODE_ENV==="development"){
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')
const errHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(cors())

mongoose.connect(process.env.URL_MONGOOSE, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false})
.then(_=>{
    console.log('connected to database')
})
.catch(err=>{
    console.log(err)
    console.log('fail to connect database')
})

app.use('/', routes)

app.use(errHandler)

app.listen(PORT, _=>{
    console.log('listening to PORT',PORT)
})