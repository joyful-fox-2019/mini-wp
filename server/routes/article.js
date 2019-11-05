const router = require("express").Router();
const ArticleController = require("../controllers/article.js");
const authenticate = require("../middlewares/authenticate.js");
const authorization = require("../middlewares/authorization.js");

router.use(authenticate);
router.get("/", ArticleController.findAll);
router.get("/:id", ArticleController.findOne);
router.post("/", ArticleController.create);
router.put("/:id", authorization, ArticleController.update);
router.delete("/:id", authorization, ArticleController.delete);

module.exports = router;