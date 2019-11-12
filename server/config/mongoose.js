const mongoose = require("mongoose")
const db = process.env.URL_DB

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(success => {
        console.log('miniwp successfully connect to mongodb')
    })
    .catch(failed => {
        console.log("mongoose connect failed")
    })