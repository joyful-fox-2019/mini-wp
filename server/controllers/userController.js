const User = require('../models/user');
const jwtHelper = require('../helpers/jwtHelper');
const hashHelper = require('../helpers/hashHelper')

class UserController {
    static register(req, res, next) {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (user) {
                    res.status(400).json({ msg: 'email already registered' })
                }
                else {
                    return User.create({
                        email: req.body.email,
                        password: req.body.password
                    })
                }
            })
            .then((user) => {
                res.status(201).json({ msg: 'register successful' })
            })
            .catch(err => {
                next(err);
            })
    }

    static login(req, res, next) {
        User.findOne({
            email: req.body.email,
        })
            .then(user => {
                if (hashHelper.compare(req.body.password, user.password)) {
                    let token = jwtHelper.generate(user.id);
                    res.status(200).json({ token });
                }
                else {
                    res.status(400).json({ msg: 'wrong email or password' })
                }
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = UserController;