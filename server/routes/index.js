const router = require("express").Router();
const userRouter = require("./user.js");
const articleRouter = require("./article.js");

router.use("/users", userRouter);
router.use("/articles", articleRouter);

module.exports = router;