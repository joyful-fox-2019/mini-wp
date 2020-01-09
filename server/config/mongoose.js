const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect("mongodb+srv://new-user_31:screamaimfire@cluster0-96gdk.gcp.mongodb.net/miniwpproject?retryWrites=true&w=majority", {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(_ => {
            console.log('mongoose connected')
        })
        .catch(err => {
            console.log(err)
        })
}