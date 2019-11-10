const Article = require('../models/article')

const gcsUpload = require('gcs-upload')
const { Storage } = require('@google-cloud/storage')
const storage = new Storage(); //need fs to read keyapi data
const myBucket = storage.bucket('miniwpdata');

class ArticleController {

  static async allArticle (req,res,next) {
    try{
      const article = await Article.find().populate('UserId')

      // let pageData = 1
      // const { page } = req.query
      // if(page){
      //   pageData = page
      // }

      // let min = ((pageData-1)*10)
      // let max = (((pageData-1)*10))+10
      // let articleData = []
      // for(let i = min; i < max; i++){
      //   if(article[i]){
      //     articleData.push(article[i])
      //   }
      //   else{break}
      // }

      // res.status(200).json({ dataAmount:article.length,page:pageData,articleData })
      res.status(200).json(article)
    }
    catch(err){
      next(err)
    }
  }

  static async userArticles (req,res,next) {
    const { _id } = req.loggedUser
    try{
      let data = await Article.find({ UserId:_id })
      if(data){
        res.status(200).json(data)
      }
      else{
        throw { message:"Data not found",status: 404 }
      }
    }
    catch(err){
      next(err)
    } 
  }

  static async findArticle (req,res,next) {
    const { slug } = req.params //ArticleId
    try{
      const articleData = await Article.findOne({ slug }).populate('UserId')
      res.status(200).json(articleData)
    }
    catch(err){
      next(err)
    }
  }

  static async createArticle (req,res,next) {
    const { imgUrl,title,description,tags } = req.body
    let finalTags = []
    if(tags){
      let arrayTags = tags.split(',')
      finalTags = []
      for(let i = 0; i < arrayTags.length; i++){
        finalTags.push(arrayTags[i].trim())
      }
    }
    let nDate = new Date()
    let slugDate = String(nDate.toLocaleDateString())
    let tempTitle = title.split(' ')
    let slug = slugDate.split('/').join('') + '-' + tempTitle.join('-') + ''
    try{
      const { _id } = req.loggedUser
      const data = await Article.create({ UserId:_id,title,description,tags:finalTags,imgUrl,slug })
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
    console.log(req.body)
    try{
      // Find old link and get the img name
      const findData = await Article.findOne({ _id })
      const deleteImageData = findData.imgUrl

      
      
      // if delete img in storange is done, then update the imgUrl in database
      const { title,description,tags,imgUrl } = req.body

      if(imgUrl && deleteImageData != imgUrl){
        let myfile = deleteImageData.split('/')
        
        // after have the img name, then peform the delete img in gcs
        const file = myBucket.file(myfile[4])
        const deleteImgDataInGCS = await file.delete()
      }

      let arrayTags = []
      let finalTags = []
      if(tags){
        arrayTags = tags.split(',')
        for(let i = 0; i < arrayTags.length; i++){
          finalTags.push(arrayTags[i].trim())
        }
      }
      let nDate = new Date()
      let slugDate = String(nDate.toLocaleDateString())
      let tempTitle = title.split(' ')
      let slug = slugDate.split('/').join('') + '-' + tempTitle.join('-') + ''
      const data = await Article.updateOne({ _id },{ imgUrl,title,description,tags:finalTags,slug })
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

  static async tagsCounter (req,res,next) {
    try{
      let data = await Article.find()
      let tagsData = []
      for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[i].tags.length; j++){
          if(tagsData.length == 0){
            tagsData.push({
              name: data[i].tags[j],
              count: 1
            })
          }
          else{
            console.log(data[i].tags[j], tagsData)
            for(let k = 0; k < tagsData.length; k++){
              if(tagsData[k].name === data[i].tags[j]){
                tagsData[k].count += 1
              }
              else{
                let sameX = false
                for(let l = 0; l < tagsData.length; l++){
                  if(data[i].tags[j] === tagsData[l].name){
                    sameX = true
                  }
                }
                if(sameX == false){
                  tagsData.push({
                    name: data[i].tags[j],
                    count: 0
                  })
                }
              }
            }
          }
        }
      }
      console.log(tagsData)
      res.status(200).json(tagsData)
    }
    catch(err){
      next(err)
    }
  }

  static async searchByTag (req,res,next) {
    const { tag } = req.params
    console.log(tag)
    try{
      let data = await Article.find({ tags:tag })
      console.log(data)
      res.status(200).json(data)
    }
    catch(err){
      next(err)
    }
  }

}

module.exports = ArticleController