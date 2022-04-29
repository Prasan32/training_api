 const express=require('express')
const multer = require('multer')
const router=express.Router()
const controllers=require('../controllers/controllers')
const auth=require('../middlewares/jwt')

const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'--'+file.originalname)
    }
})

const upload=multer({storage:fileStorageEngine})

/**
 * @swagger
 * definitions:
 *  Post:
 *   type: object
 *   properties:
 *    title:
 *     type: string
 *     description: title of the post
 *     example: 'First Post'
 *    description:
 *     type: string
 *     description: description of the post
 *     example: 'This is my first post'
 *    image:
 *     type: string
 *     format: binary
 *     description: image of the post
 *     example: 'image1.jpg'
 *    author:
 *     type: string
 *     description: author of the post
 *     example: 'admin'
 *  
 */


//routes here

/**
 * @swagger
 * /post:
 *  get:
 *   summary: fetch all the posts from the database
 *   description: This api fetches all the blog post 
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */

router.get('/',controllers.getAllPost)

/**
 * @swagger
 * /post/{id}:
 *  get:
 *   summary: get post by id 
 *   description: This api fetches particular blog post 
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 */

router.get('/:id',controllers.getPost)

/**
 * @swagger
 * /post/addPost:
 *  post:
 *   summary: creates new post
 *   description: This api creates a new post and save into the database 
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *      schema:
 *       $ref: '#definitions/Post'
 *   responses:
 *    201:
 *     description: Success
 *    500:
 *     description: Failure
 */

router.post('/addPost',upload.single('image'),controllers.createPost)

/**
 * @swagger
 * /post/editPost/{id}:
 *  put:
 *   summary: updates the existing post
 *   description: This api edit the existing post and update into the database 
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *      schema:
 *       $ref: '#definitions/Post'
 *   responses:
 *    201:
 *     description: Success
 *    500:
 *     description: Failure
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 */
router.put('/editPost/:id',upload.single('image'),controllers.updatePost)
/**
 * @swagger
 * /post/deletePost/{id}:
 *  delete:
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *   summary: delete post
 *   description: this api delete particular blog post 
 *   responses:
 *    200:
 *     description: post deleted successfully.
 *    500:
 *     description: internal server error
 */

router.delete('/deletePost/:id',controllers.deletePost)

module.exports=router