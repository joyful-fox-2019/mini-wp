const Article = require('../models/Article')

module.exports = (req, res, next) => {

  try {
    // console.log("masuk authorize");
    const _id = req.params.id
    const author = req.user.id
    // console.log("ini id, userId", _id, author);
    Article
      .findOne({ _id, author })
      .then(user => {
        // console.log("ini user di authorize", user);
        if (!user) throw {
          name: 'Unauthorized',
          errStatus: 401,
          message: 'Unauthorized access!'
        }
        next()
      })
      .catch(next)
  }
  catch (next) {}
}