if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connection = process.env.CONNECTION
const PORT = process.env.PORT
const cors = require('cors')
const routes = require('./routes/index')
const err = require('./middleware/errHandler')
const morgan = require('morgan')

mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function () {
  console.log('mongoose connected!');
})

app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)
app.use(err)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

module.exports = app