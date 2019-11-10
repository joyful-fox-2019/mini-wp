const Article = require("../models/Article");
const User = require("../models/User")
const removeFromGCS = require('../helpers/removeGCS')

class ArticleController {
  static async findAllPosted(req, res, next) {
    try {
      let articles = await Article.find({draft : false}).populate('userId').sort({updatedAt:'desc'})
      res.status(200).json(articles)
    } catch (error) {
      next(error)
    }
  }

  static async findAllDraft(req,res,next){
    try {
      let userId = req.loggedUser._id
      console.log(req.loggedUser)
      // let articles = await Article.find({draft: true, userId})
      let user = await User.findOne({_id : userId}).populate({path: 'articles',match:{draft: true}})
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req,res,next) {
    try {
      let { articleId } = req.params
      let article = await Article.findOne({_id : articleId})
      res.status(200).json(article)
    } catch (error) {
      next(error)
    }
  }

  static async findBySlug(req,res,next) {
    try {
      let { slug } = req.params
      let article = await Article.findOne({slug}).populate('userId')
      console.log(article.userId)
      res.status(200).json(article)
    } catch (error) {
      next(error)
    }
  }

  static async add(req,res,next){
    try {
      let userId = req.loggedUser._id
      let { title, content } = req.body // image multer // update juga usernya
      let tags = req.body.tags.split(',')
      let image
      if(req.file){
        image = req.file.cloudStoragePublicUrl
      } else {
        image = 'https://hacktiv8.com/img/ogdefault.jpg'
      }
      console.log(image,'ini image')
      let createArticle = await Article.create({title,content,tags,userId,image})
      let updateUser = await User.updateOne({_id : userId},{$push : {articles : createArticle._id}})
      res.status(200).json(createArticle)
    } catch (error) {
      console.log(error);
      next(error)
    } 
  }

  static async addDraft(req,res,next){
    try {
      let userId = req.loggedUser._id
      let { title, content } = req.body // image multer // update juga usernya
      let tags = req.body.tags.split(',')
      let image
      if(req.file){
        image = req.file.cloudStoragePublicUrl
      } else {
        image = ''
      }
      console.log(image,'ini image')
      let createArticle = await Article.create({title,content,tags,userId,image,draft:true})
      let updateUser = await User.updateOne({_id : userId},{$push : {articles : createArticle._id}})
      res.status(200).json(createArticle)
    } catch (error) {
      next(error)
    } 
  }

  static async remove(req,res,next){
    try {
      console.log('masuk')
      let { articleId } = req.params
      let userId = req.loggedUser._id
      let updated = await User.updateOne({_id : userId},{$pull:{articles : articleId }})
      let image = await Article.findOne({_id:articleId})
      console.log(image)
      if(image.image !== "https://hacktiv8.com/img/ogdefault.jpg"){
        let test = await removeFromGCS(image.image)
      }
      let deleted = await Article.deleteOne({_id : articleId})
      res.status(200).json({updated,deleted})
    } catch (error) {
      next(error)
    }
  }

  static async update(req,res,next){
    try {
      let userId = req.loggedUser._id
      let {articleId} = req.params
      console.log(req.body,'ini body');
      let { title, content } = req.body
      let tags = req.body.tags.split(',')
      if(req.file){
        let image = req.file.cloudStoragePublicUrl
        let createArticle = await Article.updateOne({_id:articleId},{title,content,tags,image : image,draft:false})
        res.status(200).json(createArticle)
      } else {
        let image = await Article.findOne({_id:articleId}).select('image')
        let createArticle = await Article.updateOne({_id:articleId},{title,content,tags,image : image.image,draft:false})
        res.status(200).json(createArticle)
      }
    } catch (error) {
      next(error)
    } 
  }

  static async tag(req,res,next){
    try {
     const tags = await Article.find({},'tags')
     let tag = ArticleController.uniqueTag(tags)
     res.status(200).json(tag)
    } catch (error) {
      next(error)
    }  
  }

  static uniqueTag(tags){
    let tagArr = []
    let result = []
    tags.forEach((tag)=>{
      tag.tags.forEach((allTag)=>{
        tagArr.push(allTag)
      })
    })
    let eachTag = [...new Set(tagArr)]
    let obj = {}
    eachTag.forEach((tag)=>{
      obj.name = tag
      result.push(obj)
      obj = {}
    })
    return result
  }

  static async addToFav(req,res,next){
    try {
      let { articleId } = req.params
      let userId = req.loggedUser._id
      const findBookmark = await User.findOne({_id:userId}).select('bookmarks')
      if (findBookmark.bookmarks.length < 1){
        const addBookmark = await User.updateOne({_id:userId},{$push : {bookmarks : articleId}})
        res.status(200).json(addBookmark)
      } else {
        let flag = false
        for(let i = 0; i < findBookmark.bookmarks.length; i++){
          if(findBookmark.bookmarks[i] == articleId){
            flag = false
            next({status:409,message : 'You\'ve already bookmarked this article'})
            break;
          } else {
            flag = true
          }
        }
        if(flag){
          console.log('masuk dua');
          const addBookmark = await User.updateOne({_id:userId},{$push : {bookmarks : articleId}})
          res.status(200).json(addBookmark)
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async removeFav(req,res,next){
    try {
      let { articleId } = req.params
      let userId = req.loggedUser._id
      const removeBookmark = await User.updateOne({_id:userId},{$pull : {bookmarks : articleId}})
      res.status(200).json(removeBookmark)
    } catch (error) {
      next(error)
    }
  }


}

module.exports = ArticleController;
