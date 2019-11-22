const Article = require('../models/article');
const {Schema} = require('mongoose');

class ArticleController{
    static getAll(req, res, next){
        Article.find({
            UserId: req.userid
        })
        .then(articles=>{
            console.log(articles)
            res.status(200).json(articles);
        })
        .catch(err=>{
            next(err);
        })
    }

    static getDetail(req, res, next){
        Article.findOne({
            _id: req.params.id
        })
        .then(article=>{
            res.status(200).json(article);
        })
        .catch(err=>{
            next(err);
        })
    }

    static create(req, res, next){
        Article.create({
            title: req.body.title,
            content: req.body.content,
            UserId: req.userid,
            featureImage: req.body.file
        })
        .then(article=>{
            res.status(201).json(article);
        })
        .catch(err=>{
            next(err);
        })
    }

    static update(req, res, next){
        Article.findOneAndUpdate({
            _id: req.params.id
        },{
            title: req.body.title,
            content: req.body.content,
            featureImage: req.body.file
        })
        .then(article=>{
            res.status(200).json(article);
        })
        .catch(err=>{
            next(err);
        })
    }

    static delete(req, res, next){
        Article.findOneAndDelete({
            _id: req.params.id
        })
        .then(response=>{
            res.status(204).json(response);
        })
        .catch(err=>{
            next(err);
        })
    }
}

module.exports = ArticleController