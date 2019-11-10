const router = require("express").Router();
const ArticleController = require("../controllers/article.js");
const authenticate = require("../middlewares/authenticate.js");
const authorization = require("../middlewares/authorization.js");
const multer = require("../middlewares/multer.js");
const gcs = require("../middlewares/gcs.js");

router.get("/all", ArticleController.findAll);

router.use(authenticate);
router.get("/", ArticleController.find);
router.get("/detail/:id", ArticleController.findOne);
router.get("/:id", authorization, ArticleController.findOne);
router.post("/", multer.single("featured_image"), gcs, ArticleController.create);
router.put("/:id", authorization, multer.single('featured_image'), gcs, ArticleController.update);
router.delete("/:id", authorization, ArticleController.delete);

module.exports = router;