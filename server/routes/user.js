const users = require('express').Router()
const {findAll,findOne,add,login,loginGoogle,loginGithub,update,remove,myBookmark} = require('../controllers/userController')
const auth = require('../middlewares/auth').authentication

users.get('/',findAll)
users.get('/myprofile',auth,findOne)
users.get('/mybookmark',auth,myBookmark)
users.post('/register',add)
users.post('/login/google',loginGoogle)
users.get('/login/github',loginGithub)
users.post('/login',login)
users.patch('/:userId',auth,update)
users.delete('/:userId',auth,remove)


module.exports = users