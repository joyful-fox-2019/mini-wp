const User = require('../models/user')
const {generateToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/hash')

class UserController{
    static login(req,res,next){
        const {email, password} = req.body
        User.findOne({email})
        .then(data=>{
            if(data && comparePassword(password, data.password)){
                let payload = {id : data._id, username : data.username}
                let token = generateToken(payload)
                res.status(200).json({token, payload})
            }else{
                next({
                    status : 401,
                    message :'invalid email/password'
                })
            }
        })
        .catch(next)
    }

    static register(req,res,next){
        const {username, email, password} = req.body
        User.create({username, email, password})
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(next)
    }

    static ownArticles(req,res,next){
        User.findOne({_id : req.loggedUser.id}).populate('articlesId')
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static searchOwnArticles(req,res,next){
        const filter = req.query.filter || ""
        let filtered = []
        let filterRegex = new RegExp(filter, 'gi')
        User.findOne({_id : req.loggedUser.id}).populate('articlesId')
        .then(data=>{
            data.articlesId.forEach(element=>{
                if(element.title.match(filterRegex)){
                    filtered.push(element)
                }
            })
            res.status(200).json(filtered)
        })
        .catch(next)
    }

    static upload(req, res){
        res.status(200).json({
            status: 200,
            message: 'Your file is successfully uploaded',
            link: req.file.cloudStoragePublicUrl
          })
    }

    static gsign(req,res,next){
        User.findOne({email : req.ticket.email})
        .then(data=>{
            if(data){
                let payload = {id : data._id, username : req.ticket.name}
                let token = generateToken(payload)
                res.status(200).json({token, payload})
            }else{
                return User.create({
                    email : req.ticket.email,
                    username : req.ticket.name,
                    password : process.env.DEFAULT_PASSWORD
                })
            }
        })
        .then(data=>{
            if(data){
                let payload = {id : data._id, username : data.username}
                let token = generateToken(payload)
                res.status(200).json({token, payload})
            }
        })
        .catch(next)
    }
}

module.exports = UserController