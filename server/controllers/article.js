const Article = require('../models/article')
const gcsDelete = require('../helpers/gcsdelete')

class ArticleController {
  
  static create(req, res, next){
    const { title, content, tag } = req.body
    const owner = req.user.id
    const img = req.file.cloudStoragePublicUrl
    Article.create({ title, content, img, owner, tag })
      .then( result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static find(req, res, next){
    Article.find()
      .populate('owner', '--password')
      .sort({ createdAt: 'desc'})
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static findOne(req, res, next){
    const { id } = req.params
    Article.findById(id)
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  } 

  static findByUser(req, res, next){
    const { id } = req.user
    console.log(id)
    Article.find({ owner: id })
      .populate('owner', '--password')
      .sort({ createdAt: 'desc'})
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static delete(req, res, next){
    const { id } = req.params
    Article.findById(id)
      .then(result => {
        gcsDelete(result.img)
        return Article.findByIdAndRemove( id )
      })
      .then( result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static update(req, res, next){
    const fields = [ 'title', 'content', 'tag', 'img' ]
    const { id } = req.params
    const img = req.file.cloudStoragePublicUrl
    let update = {}
    console.log(req.body)
      for( let key in req.body ){
        console.log(key, "aaaaaaaaaaaaaa")
        fields.forEach( data => {
          if( key == data ){
            update[ key ] = req.body[ key ]
          } 
      }) 
      update['img'] = img
      Article.findById(id)
        .then(result => {
          gcsDelete(result.img)
          return Article.findByIdAndUpdate(id, update)
        })
        .then( result => {
          res.status(200).json(result)
        })
        .catch( next )
    }
  }

  static search(req, res, next){
    const owner = req.user.id
    Article.find({
      title: new RegExp(`${req.query.q}`, 'gi'), owner
    })
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static searchTag(req, res, next){
    const owner = req.user.id
    Article.find({
      tag: new RegExp(`${req.query.q}`, 'gi'), owner
    })
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

}

module.exports = ArticleController