if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const PORT = process.env.PORT

mongoose.connect(process.env.MONGOOSE_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if(err) {
      console.log('db connection failed')
    } else {
      console.log('db connected')
    }
  }
)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})