const Article = require('../models/article')

const gcsUpload = require('gcs-upload')
const { Storage } = require('@google-cloud/storage')
const storage = new Storage(); //need fs to read keyapi data
const myBucket = storage.bucket('miniwpdata');

class ArticleController {

  static async allArticle (req,res,next) {
    try{
      const article = await Article.find()

      let pageData = 1
      const { page } = req.query
      if(page){
        pageData = page
      }

      let min = ((pageData-1)*10)
      let max = (((pageData-1)*10))+10
      let articleData = []
      for(let i = min; i < max; i++){
        if(article[i]){
          articleData.push(article[i])
        }
        else{break}
      }

      res.status(200).json({ dataAmount:article.length,page:pageData,articleData })
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
    const { imgUrl,title,description,tags } = req.body
    if(tags){
      var arrayTags = tags.split(',')
    }
    try{
      const { _id } = req.loggedUser
      const data = await Article.create({ UserId:_id,title,description,tags:arrayTags,imgUrl })
      res.status(201).json(data)
    }
    catch(err){
      next(err)
    } 
  }

  static async updateArticle (req,res,next) {
    const { title,description,tags } = req.body
    console.log(req.body)
    if(tags){
      var arrayTags = tags.split(',')
    }
    const { _id } = req.params
    try{
      const data = await Article.updateOne({ title,description,tags:arrayTags })
      res.status(200).json(data)
    }
    catch(err){
      next(err)
    }
  }

  static async updateImage (req,res,next) {
    const { _id } = req.params
    try{
      // Find old link and get the img name
      const findData = await Article.findOne({ _id })
      const { imgUrl } = findData

      if(imgUrl){
        let myfile = imgUrl.split('/')
        
        // after have the img name, then peform the delete img in gcs
        const file = myBucket.file(myfile[4])
        const deleteImgDataInGCS = await file.delete()
      }
      
      // if delete img in storange is done, then update the imgUrl in database
      const { title,description,tags } = req.body
      let arrayTags = []
      if(tags){
        arrayTags = tags.split(',')
      }
      const data = await Article.updateOne({ imgUrl:req.body.imgUrl,title,description,tags:arrayTags })
      res.status(200).json(data)
    }
    catch(err){
      next(err)
    }
  }

  static async deleteArticleAndImageUrl (req,res,next) {
    const { _id } = req.params
    try{
      // Find old link and get the img name
      const findData = await Article.findOne({ _id })
      const { imgUrl } = findData
      if(imgUrl){
        let myfile = imgUrl.split('/')
  
        // after have the img name, then peform the delete img in gcs
        const file = myBucket.file(myfile[4])
        const deleteImgDataInGCS = await file.delete()
        console.log(myfile[4])
  
        const deleteArticleData = await Article.deleteOne({ _id })
        res.status(200).json({ deleteArticleData,deleteImgDataInGCS })
      }
      else{
        const deleteArticleData = await Article.deleteOne({ _id })
        res.status(200).json({ deleteArticleData })
      }
      
    }
    catch(err){
      next(err)
    }
  }

}

module.exports = ArticleController