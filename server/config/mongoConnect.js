const mongoose = require('mongoose')
module.exports =()=> mongoose.connect(process.env.URL_MONGOOSE,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
},(err=>{ err ? console.log('upss 😞 your mongodb not connected') : console.log('yeayy 😁 you are connect to mongodb') }))