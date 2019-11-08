const mongoose = require('mongoose');
const MONGOOSE_CONNECT = process.env.MONGOOSE_CONNECT;

mongoose.connect(MONGOOSE_CONNECT,
    {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex : true
    })
    .then(then => {
        console.log('Success connect to mongoose');
    })
    .catch(err => {
        console.log(err);
        console.log('Error connect to mongoose database');
    })

module.exports = mongoose;



