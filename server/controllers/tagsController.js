const Tags = require('../models/tags')
const Post = require('../models/post')

class tagsController {
    static getAll(req, res, next) {
        Tags.find()
            .then(tags => {
                res.status(200).json(tags)
            })
            .catch(next)
    }

    static getOneFiltered(req, res, next) { //Filtered from current post's tags
        let post_tags = []
        let filtered_tags = []
        
        Post.findById(req.params.id).populate('Tags')
            .then(post => {
                post_tags = post.tags
                return Tags.find()
            })
            .then(tags => {
                for (let i = 0; i < tags.length; i++) {
                    if (post_tags.indexOf(tags[i]._id) == -1) {
                        filtered_tags.push(tags[i])
                    }
                }
                res.status(200).json(filtered_tags)
            })
            .catch(next)
    }

    static getOne(req, res, next) {
        let filteredByTags = []

        Post.find({
            user: req.LoggedUser.id
        }).populate('tags')
            .then(posts => {
                for (let i = 0; i < posts.length; i++) {
                    for (let j = 0; j < posts[i].tags.length; j++) {
                        if(posts[i].tags[j]._id == req.params.id) {
                            filteredByTags.push(posts[i])
                        }
                    }
                }
                res.status(200).json(filteredByTags)
            })
            
    }

    static create(req, res, next) {
        const createdTags = {
            name: req.body.name
        }

        Tags.create(createdTags)
            .then(tag => {
                res.status(201).json({
                    tag, msg: 'Tag is successfully created'
                })
            })
            .catch(next)
    }
}

module.exports = tagsController