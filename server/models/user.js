const {Schema, model, models} = require('mongoose');
const hashHelper = require('../helpers/hashHelper');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate:{
            validator(value){
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: () => 'email invalid'
        }
    },
    password: {
        type: String,
        required: true
    },
    articles: [{
        type: Schema.Types.ObjectId, ref:'Article'
    }]
},{
    timestamps: true
})

userSchema.pre('save', function(next){
    this.password = hashHelper.hash(this.password);
    next();
})

const User = model('User', userSchema);

module.exports = User;