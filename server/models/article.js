const {
    Schema,
    model
} = require('mongoose')

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please input title of your article']
    },
    content: {
        type: String,
        required: [true, 'Please input the content of your article']
    },
    created_at: {
        type: String,
        default: new Date()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    featured_image: {
        type: String,
        default: 'https://img.freepik.com/free-photo/blue-mountains-famous-tourism-scenery-lijiang_1417-1143.jpg?size=626&ext=jpg'
    },
    status: {
        type: String,
        enum: ['Published', 'Draft'],
        default: 'Draft'
    }
}, {
    timestamps: true,
    versionKey: false
})

articleSchema.pre('save', function (next) {
    this.created_at = new Date(this.created_at).toISOString().split("T")[0]
    next()
})

articleSchema.pre('findOneAndUpdate', function (next) {
    if (this._update.title === '' || this._update.content === '') {
        throw '422'
    } else {
        next()
    }
})

const Article = model('Article', articleSchema)

module.exports = Article