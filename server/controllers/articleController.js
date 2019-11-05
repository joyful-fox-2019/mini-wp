const Article = require('../models/article')

const gcsUpload = require('gcs-upload')
const { Storage } = require('@google-cloud/storage')
const storage = new Storage(); //need fs to read keyapi data
const myBucket = storage.bucket('miniwp');

class ArticleController {

  static async allArticle (req,res,next) {
    try{
      const article = await Article.find()
      res.status(200).json(article)
    }
    catch(err){
      next(err)
    }
  }

  static async findArticle (req,res,next) {
    const { _id } = req.params //ArticleId
    try{
      const articleData = await Article.findOne({ _id })
      res.status(200).json(articleData)
    }
    catch(err){
      next(err)
    }
  }

  static async createArticle (req,res,next) {
    try{
    console.log(req.body)
    let data
    if(req.body.imgUrl){
      const upload = gcsUpload({
        limits: {
          fileSize: 1e6 // in bytes
        },
        gcsConfig: {
          keyFilename: '/home/dipadana/Downloads/portofoliodipadanaputu-0f8fbd112149.json', // keyapi location
          bucketName: myBucket // bucket name
        }
      })
      await upload.single('imgUrl')
      const { title,imgUrl,description,tags } = req.body
      const { _id } = req.loggedUser
      data = await Article.create({ UserId:_id,title,imgUrl,description,tags })
    }
    else{
      const { title,description,tags } = req.body
      const { _id } = req.loggedUser
      data = await Article.create({ UserId:_id,title,description,tags })
    }
    res.status(201).json(data)
    }
    catch(err){
      next(err)
    } 
  }

  static async updateArticle (req,res,next) {
    const { article,description,tags } = req.body
    const { _id } = req.params
    try{
      const data = await Article.updateOne({ article,imgUrl,description,tags })
      res.status(200).json(data)
    }
    catch(err){
      next(err)
    }
  }

  static async updateImage (req,res,next) {
    const { _id } = req.params
    let newImgUrl // from googleGCS middleware
    let oldImgUrl // from somewhere
    try{
      // excexute delete img
      const file = myBucket.file('my-file'); // my-file akan diisi oleh nama file yang didapat dari link URL
      const deleteImgDataInGCS = await file.delete()
      if(deleteImgDataInGCS){
        const data = await Article.updateOne({ imgUrl })
        res.status(200).json(data)
      }
    }
    catch(err){
      next(err)
    }
  }

  static async deleteArticleAndImageUrl (req,res,next) {
    const { _id } = req.params
    try{
      const deleteArticleData = await Article.deleteOne({ _id })
      const deleteImgDataInGCS = await file.delete()
      res.status(200).json({ deleteArticleData,deleteArticleAndImageUrl })
    }
    catch(err){
      next(err)
    }
  }

}

module.exports = ArticleController