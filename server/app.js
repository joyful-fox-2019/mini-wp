if (process.env.NODE_ENV === "development") {
    require("dotenv").config();
}
require("./config/connection.js");
const express = require("express");
const routes = require("./routes/index.js");
const errorHandler = require("./middlewares/errorHandler.js");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening from port : ${PORT}`));