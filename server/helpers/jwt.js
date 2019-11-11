const jwt = require('jsonwebtoken');

function getToken(data) {
    // console.log(process.env.JWT_SECRET)
    return jwt.sign(data, 'dotenverror');
}

function verifyToken(token) {
    return jwt.verify(token, 'dotenverror');
}

module.exports = {
    getToken,
    verifyToken
}