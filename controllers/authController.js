const joi=require('joi')
const User=require('../models/User')
const jwt=require('jsonwebtoken')

exports.saveUser=async(req,res)=>{

    //validate incoming request body
    const userSchema=joi.object({
        name:joi.string().min(3).max(50).required(),
        address:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().min(5).required()
    })

    const {error}=userSchema.validate(req.body)

    if(error){
        res.status(400).json({
            "message":error.message,
            "status":false
        })
    }else{
          
          try {
            const {name,address,email,password}=req.body

            //check if user already exist
            const checkUser=await User.findAll({where:{email:email}})

            if(checkUser.length>0){
                res.status(400).json({
                    "message":"This email is already registered",
                    "status":false
                })
            }else{
                const user={
                    name,
                    address,
                    email,
                    password
                }

                const result=await User.create(user)
                if(result){
                   res.status(201).json({
                       "message":"Registered Successfully!!!",
                       "status":true
                   }) 
                }else{
                    res.status(500).json({
                        "message":"Something went wrong!!!",
                        "status":false
                    })
                }

            }
              
          } catch (error) {
            res.status(500).json({
                "message":"Internal Server error",
                "status":false
            })
          }

    }

}



exports.login=async (req,res)=>{

    const {email,password}=req.body

    try {
        //check if email exist or not
        const user=await User.findOne({where:{email:email}})

        if(user==null){
             res.status(400).json({
                 "message":"Invalid email !!!",
                 "status":false
             })
        }else{
          //check password
          if(user.password==password){
              let access_token=jwt.sign({id:user.user_id,email:user.email},'thisismysecret',{expiresIn:'3600s'})
              res.status(200).json({access_token:access_token})

          }else{
              res.status(400).json({
                  "message":"Invalid email or password",
                  "status":false
              })
          }

        }

    } catch (error) {
        res.status(500).json({
            "message":"Internal Server error",
            "status":false
        })
    }

}