if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3000
const URI = process.env.URI

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology:true })
    .then(()=>{
        console.log(`success connect to mongodb`);
    })
    .catch(()=>{
        console.log(`fail connect to mongodb`);
    })


app.use('/', router)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`this app is listening on port`, PORT);
})