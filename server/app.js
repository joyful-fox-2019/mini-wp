if (process.env.NODE_ENV === 'development') require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

mongoose
	.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('mongodb connected'))
	.catch(err => console.log('mongodb connection failed', err));

app.use('/', require('./routes'));

app.listen(PORT, () => console.log('app listening to port', PORT));
