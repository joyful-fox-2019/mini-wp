const routes = require("express").Router();
const ArticleController = require("../controllers/article");


routes.post("/", ArticleController.find);
routes.post("/create", ArticleController.create);
routes.delete("/delete/:id", ArticleController.delete);


module.exports = routes;