if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true})
    .then(_=> {
        console.log("Mongoose successfully connected");
    })
    .catch(console.log)

app.use(errorHandler)
app.use('/', routes)

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`)
})



