const User = require('../models/User');
const bcrypt = require('../helpers/bcrypt');
const session = require('../helpers/session');

class UserController {
    static register(req, res, next) {
        const { name, email, password } = req.body;
        User.findOne({
            email
        })
            .then(user => {
                if (user) {
                    let err = {
                        status: 409,
                        msg: "User already exist."
                    }
                    next(err);
                } else {
                    User
                    .create({
                        name,
                        email,
                        password
                    })
                    .then( data => {
                        res.status(201).json(data);
                    })
                    .catch( err => {
                        next(err);
                    })
                }
            })
            .catch( err => {
                next(err);
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body;
        User
            .findOne({
                email
            })
            .then( user => {
                if(user) {
                    if (bcrypt.compare(password, user.password)) {
                        let token = session.encode({id: user.id, email: user.email});
                        
                        res.status(200).json(token);
                    } else {
                        let err = {
                            status: 401,
                            msg: 'Wrong email / password.'
                        }
                        next(err);
                    }
                } else {
                    let err = {
                        status: 401,
                        msg: 'User not found. Please register.'
                    }
                    next(err);
                }
            })
            .catch( err => {
                next(err);
            })
    }

    static gSign(req, res, next) {
        const { gProfile } = req.body;
        User
            .find({
                email: gProfile.U3
            })
            .then( user => {
                if (user) {
                    let token = session.encode({id: user.id, email: user.email});
                    res.status(200).json(token);
                } else {
                    User
                        .create({
                            name: gProfile.ig,
                            email: gProfile.wea
                        })
                        .then( data => {
                            res.status(201).json(data);
                        })
                        .catch( err => {
                            next(err);
                        })
                }
            })
            .catch( err => {
                next(err);
            })
            
    }
}

module.exports = UserController;