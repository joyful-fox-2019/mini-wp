if (process.env === 'development') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const connection = require('./config/connection');
const routes = require('./routes');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const app = express();
const errorHandler = require('./middleware/errorHandling')
//coonection

// console.log(process.env)
connection()
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use('/', routes);
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Listen To Port : ${PORT}`);
})

module.exports = app;