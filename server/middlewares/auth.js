'use strict'
const verifyJwt = require('../helpers/verifyJwt') // ini dugunaka buat men-decoded token
const User = require('../models/user')

module.exports = {
    authenticate : (req, res, next) => {
        const user = verifyJwt(req.headers.token)
        try {    
            // masukkan data yang telah diencoded
            User.findOne({
                _id : user._id // cari apakah data dia ada di server
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
        try {
            User
                .findById(req.user._id)
                .then(user => {
                    if (user.articleList.includes(req.params.id)) {
                        next()
                    } else {
                        next({
                            name : 'NotAuthorized'
                        })
                    }
                })     
        } catch (err) {
            next(err)
        }
    }
} 