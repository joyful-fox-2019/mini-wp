if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://new-user_31:screamaimfire@cluster0-96gdk.gcp.mongodb.net/miniwpproject?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true
});
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cors())

app.use('/', routes)

app.use(errorHandler)


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))