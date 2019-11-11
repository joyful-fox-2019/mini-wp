if (process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routers')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT || 3000

const mongooseConfig = {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.MONGOOSE_URL, mongooseConfig, (err) => {
    if (err) console.log(err)
    console.log('database connected')
})

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`You're connected to port ${PORT}`)
})