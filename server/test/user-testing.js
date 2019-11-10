const chai = require('chai')
const expect = chai.expect
const chaihttp = require('chai-http')
const app = require('../app.js')
const db = require('../models/user')

chai.use(chaihttp)

// before(function () {
//   db.collection
// })
describe('User', function () {
  describe('register', function () {
    // Success
    it.only('Should add new user without error and status code 201', function (done) {
      let body = {
        username: 'user test',
        email: 'user@mail.com',
        password: 'password'
      }

      chai.request(app)
        .post('/users/register')
        .send(body)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.have.all.keys(
            'username',
            'email',
            'token'
          )
          done()
        })
    })

    // Username and Email is required
    it.only('Should error with status 400 and message "Username is required!, Email is required!"', function (done) {
      let body = {
        username: '',
        email: '',
        password: 'password'
      }

      chai.request(app)
        .post('/users/register')
        .send(body)
        .end((err, res) => {
          expect(res.body[0]).to.be.equal('Username is required!')
          expect(res.body[1]).to.be.equal('Email is required!')
          expect(res).to.have.status(400)
          done()
        })
    })

    // Email has already taken
    it.only('Should error with status 400 and message "Email is already taken!"', function (done) {
      let body = {
        username: 'user',
        email: 'user@mail.com',
        password: 'password'
      }

      chai.request(app)
        .post('/users/register')
        .send(body)
        .end((err, res) => {
          expect(res.body[0]).to.be.equal('Email is alredy taken!')
          expect(res).to.have.status(400)
          done()
        })
    })
  })

  // Login User
  describe('login', function () {
    // Success
    it.only('Should login without error and have status 200 an user will get token, email, and username', function (done) {
      let body = {
        identity: 'user@mail.com',
        password: 'password'
      }

      chai.request(app)
        .post('/users/login')
        .send(body)
        .end((err, res) => {
          expect(err).to.have.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.all.keys(
            'token',
            'username',
            'email'
          )
          done()
        })
    })

    // Wrong Username / Password
    it.only('Should error with status 401 and message "Username / Password wrong!"', function (done) {
      let body = {
        identity: 'user@mail.com',
        password: 'pwd'
      }

      chai.request(app)
        .post('/users/login')
        .send(body)
        .end((err, res) => {
          expect(res).to.have.status(401)
          expect(res.body).to.be.equal('Wrong Username / Email / Password')
          expect(err).to.be.null
          done()
        })
    })
  })
})