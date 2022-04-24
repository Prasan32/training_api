const express=require('express')
const multer = require('multer')
const router=express.Router()
const controllers=require('../controllers/controllers')

const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'--'+file.originalname)
    }
})

const upload=multer({storage:fileStorageEngine})


//routes here
router.get('/',controllers.getAllPost)

router.get('/:id',controllers.getPost)

router.post('/addPost',upload.single('image'),controllers.createPost)

router.put('/editPost/:id',controllers.updatePost)

router.delete('/deletePost/:id',controllers.deletePost)

module.exports=router