const router = require('express').Router()
const projectController = require('../controllers/projectController')
const authetication = require('../middlewares/authentication')
const gcsUpload = require('gcs-upload')

const upload = gcsUpload({  
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: './credentials-gcs.json',
      bucketName: 'bucket-alfred'
    }
  })
  

//   app.post('/upload-single', upload.single('file'), (req, res) => {
//     console.log(req.body)
//     res.end()
//   })
//   app.post('/upload-array', upload.array('files'), (req, res) => {
//     console.log(req.body)
//     res.end()
//   })
  
//   app.post('/upload-fields',
//     upload.fields([{ name: 'file1' }, { name: 'file2' }]),
//     (req, res) => {
//       console.log(req.body)
//       res.end()
//     }
//   )





router.use(authetication)

router.get('/',projectController.findByUserId)
router.get('/:id',projectController.findOne)
router.get('/all',projectController.showAlll)
router.post('/', upload.array('files'),projectController.createProject)
router.delete('/:id',projectController.deleteProject)
router.put('/:id',projectController.updateProject)

module.exports = router