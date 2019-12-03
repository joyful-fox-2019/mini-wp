const Article = require('../models/article')
const { Storage } = require('@google-cloud/storage')

class ArticleController {
  static find (req, res, next) {
    const { keyword , whose, status, sort, page } = req.query
    const limit = 6
    let objParams = { status } //type = draft/public
    let sortParams = { createdAt: -1}
    if(sort === 'popular') sortParams = [['reads', 'desc']]
    if(whose === 'mine') objParams.owner = req.loggedUser.id
    if(status === 'draft') objParams.owner = req.loggedUser.id
    if(keyword) { objParams.$or = [ {
      title: { $regex: keyword, $options: 'i'}},
      {content: {$regex: keyword, $options: 'i'}},
      {tags: keyword}
    ]
    }
    Article.find(objParams).populate('owner').sort(sortParams).skip(page * limit).limit(limit)
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  }
  static create (req, res, next) {
    const { title, content, image, tags, status } = req.body
    const { id } = req.loggedUser
    Article.create({ title, content, image, tags, status, owner: id })
      .then(article => {
        res.status(201).json({ article, message: 'Succesfully created article'})
      })
      .catch(next)
  }
  static findById (req, res, next) {
    const { slug } = req.params
    const { mode } = req.query
    Article.findOne({ slug }).populate('owner')
      .then(article => {
        if(mode === 'read' && article.status === 'published') {
          article.reads ++
        } 
        return article.save({ validateBeforeSave: false})
      })
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }
  static update (req, res, next) {
    const { slug } = req.params
    const { title, content, image, tags, status } = req.body
    Article.findOne({ slug })
      .then(article => {
        if(image !== article.image && article.image) {
          const bucket = process.env.BUCKET_NAME
          const storage = new Storage({
            keyFilename: process.env.KEYFILE_PATH,
            projectId: process.env.PROJECT_ID
          })
          let picture = article.image
          let filename = picture.replace(/(https:\/\/storage.googleapis.com\/wordride-image\/)/, '')
          storage.bucket(bucket).file(filename).delete()
        }
        article.title = title
        article.content = content
        if(image) article.image = image
        article.tags = tags
        article.status = status
        return article.save()
      })
      .then(article => {
        res.status(200).json({ message: 'Successfully updated article', article})
      })
      .catch(next)
  }
  static remove ( req, res, next ) {
    const { slug } = req.params
    Article.findOneAndRemove({ slug })
      .then(article => {
        if(article.image){
          const bucket = process.env.BUCKET_NAME
          const storage = new Storage({
            keyFilename: process.env.KEYFILE_PATH,
            projectId: process.env.PROJECT_ID
          })
          let picture = article.image
          let filename = picture.replace(/(https:\/\/storage.googleapis.com\/wordride-image\/)/, '')
          storage.bucket(bucket).file(filename).delete()
        }
        res.status(200).json({ message: `Successfully deleted article ${article.title}`})
      })
      .catch(next)
  }
}

module.exports = ArticleController
