if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/mini-wp',
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => { console.log('success connecting to database') },
        (err) => { console.log(err) });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/', router);

app.use('/', (err, req, res, next) =>{
    res.status(500).json(err)
})

app.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT));