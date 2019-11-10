'use strict'
const { verifyToken } = require('../helpers/jwt') // ini dugunaka buat men-decoded token
const User = require('../models/user')
const Article = require('../models/article')

module.exports = {
    authenticate : (req, res, next) => {
        try {    
            // masukkan data yang telah diencoded
            const user = verifyToken(req.headers.token)
            console.log('masuk authenticate')
            User.findOne({
                _id : user.id // cari apakah data dia ada di server
            })
            .then (user => {
                if (user) {
                    req.user = user // kalo ada maka simpan user di req.user
                    next()
                } else {
                    next({
                        name : 'DataError' //kalau tidak ada maka harus login lagi
                    })
                }
                
            })     
            
        } catch(err) {  
            next(err)    
        }
    },
    authorize : (req, res, next) => {
        Article
            .findById(req.params.id)
            .then(article => {
                if (article) {   
                    console.log(article )     
                    console.log(req.user._id)            
                    if (String(article.user) == req.user._id) {
                        console.log(article)
                        next()
                    } else {
                        next({
                            status : 401,
                            msg : 'Not Authorized'
                        })
                    }
                } else {
                    next({
                        status : 404,
                        msg : 'data not found'
                    })
                }
            })
            .catch(next)
    }        
        
} 