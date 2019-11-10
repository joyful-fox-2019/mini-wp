if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use('/wp', router)
app.use(errorHandler)

mongoose.connect(
    'mongodb://localhost:27017/mini-wp',
    // process.env.ATLAS_URL,
    {useNewUrlParser: true, useUnifiedTopology: true}
     
    )

    .then(() => {
        console.log('db connected')
    })
    .catch((err) => {
        console.log(err)
        console.log('db disconnected'); 
    })
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

app.listen(port, () => {
    console.log('listening port ', port);
    
})

