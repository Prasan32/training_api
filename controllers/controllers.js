const Post=require('../models/Post') //importing Post model

exports.getAllPost=(req,res)=>{
    res.status(200).json({
        message:'Data found successfully !!!',
        data:[]
    })
}

exports.getPost=(req,res)=>{
    res.status(200).json({
        message:'Data found successfully !!!',
        data:[{
            title:'First post',
            description:'This is my first post',
            author:'admin'
        }]
    })
}

exports.createPost=async (req,res)=>{
     //destructuring incoming request body
       const {title,description,author}=req.body
       const image=req.file.filename

    //creating post object 
    let post={
        title,
        description,
        image:image,
        author
    }

    console.log(req.body);
    console.log(req.file);

    // using Post object to create new post and save it in the database
   await Post.create(post)
    .then((result)=>{
        res.status(201).json({
              "message":'Post Created Successfully!!!',
              data:result
        })
    })
    .catch((error)=>{
        console.log(error);
       res.status(500).json({
           "message":'Internal Server Error',
           "status":false
       })
    })




}

exports.updatePost=(req,res)=>{
    res.status(201).json({
        message:'Post updated successfully !!!',
        object:{
            title:'First post',
            description:'This is my first updated post',
            author:'admin'
        }
    }) 
}


exports.deletePost=(req,res)=>{
    res.status(200).json({
        message:'Post deleted successfully !!!',
        object:{
            title:'First post',
            description:'This is my first post',
            author:'admin'
        }
    })
}