const User = require('../models/User')
const verifyToken = require('../helpers/verifyToken')

module.exports = (req, res, next) => {
  try {
    const { access_token } = req.headers
    const decoded = verifyToken(access_token, next)
    // console.log('cek decoded di authenticate', decoded)
    if (!decoded) {
      throw {
        name: 'Unauthorized',
        errStatus: 401,
        message: 'Unauthorized access!'
      }
    }
    const { payload } = decoded
    
    User
    .findOne({ email: payload.email })
    .then(user => {
      console.log('ini user di authenticate', user);
      if (!user) {
        throw {
          name: 'Unauthorized',
          errStatus: 401,
          message: 'Unauthorized access!'
        }
      }
        // console.log("masuk authenticate");
        req.user = { id: user._id, name: user.name, email: user.email, picture: user.picture }
        next()
      })
      .catch(next)
  }
  catch (next) {
  }
}