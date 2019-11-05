const routes = require("express").Router()
const ArticleController = require("../controllers/ArticleController")
const authentication = require("../middlewares/authentication")
const { authorization } = require("../middlewares/authorization")

routes.use(authentication)
routes.get("/", ArticleController.findAll)
routes.post("/", ArticleController.create)
routes.patch("/:id", authorization, ArticleController.updateOne)
routes.delete("/:id", authorization, ArticleController.delete)
routes.get("/:id", authorization, ArticleController.findOne)


module.exports = routes