const mongoose = require('mongoose');
const password = require('../helpers/password');
const Shcema = mongoose.Schema;

const userSchema = new Shcema({
    username:{
        type: String,
        required: [true, 'username cannot empty']
    },
    email:{
        type: String,
        required: [true, 'email cannot empty'],
        validate:{
            validator(value){
                let isEmail = /[0-9]+@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                let valid = isEmail.test(value);
                return valid
            },
            message: "your email is not valid"
        }
    },
    password:{
        type: String,
        required: [true, "password cannot empty"],
        minlength: [6, "password min 6 digits"],
        validate:{
            validator(value){
                let isPasword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
                let valid = isPasword.test(value);
                return valid;
            },
            message: "password min 8 digit, include uppercase, lowercase letter and number"
        }
    }
},
{
    versionKey: false
})

userSchema.pre('save', function(next){
    let hashPassword = password.hash(this.password);
    this.password = hashPassword
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User