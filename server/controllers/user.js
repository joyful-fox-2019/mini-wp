const UserModel = require('../models/user')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

module.exports =  {
    googleLogin(req,res,next){
        UserModel.findOne({
            email : req.decoded.email
        })
        .then(user=>{
            console.log('user',user);
            let { name, email } = req.decoded
            if(user){
                const token = generate({ id:user._id, email : user.email})
                res.status(200).json({token})
            } else {
                return UserModel.create({
                    email,
                    password : process.env.DEFAULT_PASSWORD
                })
            }
        })
        .then(user=>{
            const token = generate({_id:user._id, email:user.email})
            res.status(200).json({token})
        })
        .catch(next)
    },
    register(req, res, next) {
        const { name, password, email } = req.body
        UserModel.create({ name, password, email })
            .then(user => {
                let payload = { email: user.email, id: user._id }
                let token = generateToken(payload)
                res.status(200).json({ token, name: user.name })
            })
            .catch(next)
    },
    login(req, res, next) {
        const { email, password } = req.body
        UserModel.findOne({ email })
            .then(user => {
                if (user) {
                    if (comparePassword(password, user.password)) {
                        let payload = { email: user.email, id: user._id }
                        let token = generateToken(payload)
                        res.status(200).json({ token, name: user.name })
                    } else {
                        next({ status: 400, message: 'Wrong Password' })
                    }
                } else {
                    next({ status: 404, message: 'Email Not Found' })
                }
            })
            .catch(next)
    },
    findAll(req, res, next) {
        UserModel.find()
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    },
    delete(req, res, next) {
        UserModel.findOneAndDelete({
            _id : req.params.id
        })
        .then(user => {
            res.status(200).json({ user, message : 'Delete Success' })
        })
        .catch(next)
    }
}