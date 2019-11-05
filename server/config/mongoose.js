const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/miniWP', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(_ => {
            console.log('connected successfully to mongoose database')
        })
        .catch(err => {
            console.log(err)
        })
}