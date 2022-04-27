const Post=require('../models/Post') //importing Post model

exports.getAllPost=async (req,res)=>{
    try {
        const posts =await Post.findAll()
        if(posts){
            res.status(200).json({
                "message":'Data found successfully!!!',
                "data":posts
            })
        }
    } catch (error) {
        res.status(500).json({
            "message":"Internal Server Error",
            "status":false
        })
    }
}

exports.getPost=async (req,res)=>{
       try {
           const post=await Post.findAll({where:{post_id:req.params.id}})
           if(post.length!==0){
               res.status(200).json({
                "message":'Data found successfully!!!',
                "data":post
               })
           }else{
               res.status(500).json({
                   "message":"No data found with the given id",
                   "status":false
               })
           }
       } catch (error) {
        res.status(500).json({
            "message":"Internal Server Error",
            "status":false
        }) 
       }
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

exports.updatePost=async (req,res)=>{
    //destructuring incoming request body
    const {title,description,author}=req.body
    const updatedPost={title,description,author}

    try {
        const post=await Post.update(updatedPost,{where:{post_id:req.params.id}})
        console.log(post);
        if(post[0]===1){
            res.status(200).json({
                "message":"Data Updated Successfully",
                "data":updatedPost,
                "status":true
            })
        }else{
            res.status(500).json({
                "message":"No data found with the given id",
                "status":false
            })
        }
    } catch (error) {
        res.status(500).json({
            "message":'Internal Server Error',
            "status":false
        })
    }
}


exports.deletePost=async (req,res)=>{
     try {
         let deletePost=await Post.destroy({where:{post_id:req.params.id}})
         if(deletePost){
             res.status(200).json({
                 "message":"Data deleted successfully",
                 "status":true
             })
         }else{
            res.json(500).json({
                "message":"No data found with the give id",
                "status":false
            })
         }
     } catch (error) {
        res.status(500).json({
            "message":'Internal Server Error',
            "status":false
        })
     }
}