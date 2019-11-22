const User = require('../models/user')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    let { name, email, password } = req.body
    console.log(req.body)
    let userData = { name, email, password }
    User.create(userData)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(next);
  }
  static login(req, res, next) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user && bcrypt.compare(req.body.password, user.password)) {
          let access_token = jwt.generate({ id: user._id });
          res.status(200).json({
            access_token,
            name: user.name
          });
        } else {
          throw {
            status: 401,
            message: 'Email or Password is incorrect'
          };
        }
      })
      .catch(next);
  }
  static googleLogin(req, res, next) {
    let { name, email } = req.decoded
    User.findOne({ email })
    .then(user => {
      if (user) {
        return user
      } else {
        return User.create({
          name,
          email,
          password: 'hacktiv8phase2'
        })
      }
    })
    .then(user => {
      let access_token = jwt.generate({ id: user._id, email: user.email })
      res.status(200).json({
        access_token,
        name: user.name
      })
    })
    .catch(next)
  }
}

module.exports = UserController