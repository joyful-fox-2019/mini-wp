if(prcess.env.NODE_ENV === 'development'){
  require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env_PORT || 3000
const Post = require('./models/post')
const User = require('./models/user')
const {authentication} = require('./middlewares/auth')
const {authorization} = require('./middlewares/auth')
const {verifyPassword} = require('./helpers/hashPassword')
const {generateToken} = require('./helpers/token')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost/mini-wp', {useUnifiedTopology: true, useNewUrlParser: true}, function(err) {
  if(err) console.log(err)
  else console.log('connected db') })


app.post('/register', (req,res)=>{
  User.create({
    email: req.body.email,
    password: req.body.password
  })
})

app.post('/login', (req,res,next)=>{
  User.findOne({
    email: req.body.email
  })
  .then(user => {
    if(user && verifyPassword(req.body.password, user.password) == true){
      let userPayload = {
        id: User._id
      }
    }
    let accessToken = generateToken(userPayload)
    res.status(201).json({access_token = accessToken})
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

app.get('/posts', authentication, (req,res)=>{
  Post.find({
    UserId: req.loggedUser.id
  })
  .then(posts => {
    res.send(posts)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

app.post('/posts', authentication, (req,res)=>{
  Post.create({
    title: req.body.title,
    content: req.body.content,
    createdAt: Date.now(),
    UserId: req.loggedUser.id
  })
  .then(() => {
    res.status(201).json('created')
  })
})

app.get('/posts/:id', authentication, (req,res)=>{
  Post.findOne({
    _id: req.params.id
  })
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

app.delete('/posts/:id', authentication, authorization, (req,res)=>{
  Post.delete({
    _id: req.params.id
  })
  .then(post => {
    res.status(200).json({message: 'post successfully deleted'})
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

app.listen(port, console.log(`Listening on port ${port}`))
