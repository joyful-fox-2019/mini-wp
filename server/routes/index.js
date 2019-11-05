const router = require('express').Router()
const userRouter = require('./userRouter')
const articleRouter = require('./articleRouter')

router.get('/',(req,res,next)=>{
    res.json({message:'welcome to mini wordpress'})
})

router.use('/users',userRouter)
router.use('/articles',articleRouter)

module.exports = router