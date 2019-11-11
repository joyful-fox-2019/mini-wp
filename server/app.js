process.env.NODE_ENV == 'development' ? require('dotenv').config() : ''

const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

mongoose.connect(process.env.URL_MONGOOSE,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
},(err=>{ err ? console.log('upss 😞 your mongodb not connected') : console.log('yeayy 😁 you are connect to mongodb') }))

app.use('/',routes)
app.use(errorHandler)

app.listen(PORT,(_=>{ console.log('youre running in port',PORT)}))