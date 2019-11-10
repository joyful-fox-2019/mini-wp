const Post = require('../models/post')
const User = require('../models/user')
const Tags = require('../models/tags')

class postController {
    static getPersonalPosts(req, res, next) {
        const user = {
            user: req.LoggedUser.id
        }

        Post.find(user).populate('tags')
            .then(posts => {
                res.status(200).json(posts)
            })
            .catch(next)
    }

    static getFollowingPost(req, res, next) {
        User.findById(req.LoggedUser.id).populate({
            path: 'following',
            populate: {
                path: 'post',
                model: 'Post'
            }
        })
            .then(user => {
                let following = user.following 
                res.status(200).json(following)
            })
            .catch(next)
    }

    static getLikedPost(req, res, next) {
        let filteredLikedPost = []
        Post.find().populate('user')
            .then(posts => {
                for (let i = 0; i < posts.length; i++) {
                    for(let j = 0; j < posts[i].like.length; j++) {
                        if (posts[i].like[j] == req.LoggedUser.id) {
                            
                            filteredLikedPost.push(posts[i])
                        }
                    }
                }
                res.status(200).json(filteredLikedPost)
            })
    }

    static getPopularPosts(req, res, next) {
        Post.find().sort({'like.length': -1}).populate('user').populate('tags')
            .then(posts => {
                res.status(200).json(posts)
            })
            .catch(next)
    }

    static create(req, res, next) {
        const createdPost = {
            title: req.body.title,
            content: req.body.content,
            user: req.LoggedUser.id,
            img: req.body.img,
            tags: req.body.tags
        }

        Post.create(createdPost)
            .then(post => {
                return User.findByIdAndUpdate(req.LoggedUser.id, {
                    $push: {
                        post: post._id
                    }
                })
                .then(user => {
                    res.status(201).json({
                        post, msg: 'Post is successfully created'
                    })
                })
                .catch(next)
            })
            .catch(next)
    }

    static edit(req, res, next) {
        const editedPost = {
            title: req.body.title,
            content: req.body.content,
            img: req.body.img,
            tags: req.body.tags
        }

        Post.findByIdAndUpdate(req.params.id, editedPost)
            .then(post => {
                res.status(200).json({
                    post, msg: 'Post is successfully updated'
                })
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Post.findByIdAndDelete(req.params.id)
            .then(post => {
                return User.findByIdAndUpdate(req.LoggedUser.id, {
                    $pull: {
                        post: req.params.id
                    }
                })
                .then(user => {
                    res.status(200).json({
                        post, msg: 'Post is successfully deleted'
                    })
                })
                .catch(next)
            })
            .catch(next)
    }

    static likeUnlike (req, res, next) {
        let notDuplicate = false

        Post.findById(req.params.id)
            .then(post => {
                for (let i = 0; i < post.like.length; i++) {
                    if (post.like[i] == req.LoggedUser.id) {
                        notDuplicate = true
                    }
                }

                if (!notDuplicate) {
                    return Post.findByIdAndUpdate(req.params.id, {
                        $push: {
                            like: req.LoggedUser.id
                        }
                    })
                    
                } else {
                    return Post.findByIdAndUpdate(req.params.id, {
                        $pull: {
                            like: req.LoggedUser.id
                        }
                    })
                }
            })
            .then(post => {
                if (!notDuplicate) {
                    res.status(200).json({
                        post, msg: 'Post is successfully liked'
                    })
                } else {
                    res.status(200).json({
                        post, msg: 'Post is successfully unliked'
                    })
                }
            })
            .catch(next)
    }
}

module.exports = postController