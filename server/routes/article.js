const routes = require("express").Router();
const ArticleController = require("../controllers/article");
const authenticate = require("../middlewares/authenticate");
const authorization = require("../middlewares/authorization");
const {
    multer,
    sendUploadToGCS
} = require('../middlewares/uploader')


// routes.use(authenticate);
routes.use(authenticate)
routes.get("/", ArticleController.find);
// routes.post("/", multer.single("image"), sendUploadToGCS, ArticleController.create);
routes.post("/", ArticleController.create);
routes.delete("/:id", authorization, ArticleController.delete);
routes.put("/:id", authorization, ArticleController.update);



module.exports = routes;