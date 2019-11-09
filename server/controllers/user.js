const User = require('../models/user')
const { comparePass } = require('../helpers/bcrypt')
const { sign, verify } = require('../helpers/jwt')

class UserController {
  static register ( req, res, next ) {
    const { name, email, password } = req.body
    User.create({ name, email, password })
      .then(user => {
        res.status(201).json({ user, message: 'Successfully register, please login'})
      })
      .catch(next)
  } 
  static login ( req, res, next ) {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        if(user && comparePass(password, user.password)){
          const token = sign({ id: user._id })
          res.status(200).json({ token, message: 'welcome back!'})
        } else {
          next({ status: 400, message: 'Wrong email or password'})
        }
      })
      .catch(next)
  }
  static vefify ( req, res, next ) {
    try {
      verify(req.headers.token)
      res.status(200).json({ message: 'User is verified'})
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = UserController
