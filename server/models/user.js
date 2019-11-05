const { Schema, model } = require('mongoose')
const hashPassword = require('../helpers/hashPassword')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'must fill the email'],        
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Inter valid email'],
        validator : {
            validate : function(v) {
                return this.findOne({
                    email : v
                })
                .then(user => {
                    if (user) {
                        return false
                    } else {
                        return true
                    }
                })
            }, message : 'this email has been registered'
        }
      },
    password : {
        type : String,
        required : [true, 'must fill the password'],
    },
    name : {
        type : String
    },
    photo : {
        type : String
    },
    articleList : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Article'
        }
    ]
})

userSchema.pre('save', function (next){ // disini tidak boleh pake arrow
    this.password = hashPassword(this.password)
    next() // wajib ada next di hooks
})

const User = model('User', userSchema)
module.exports = User