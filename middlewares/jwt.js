const jwt=require('jsonwebtoken')

const auth=async (req,res,next)=>{

    let authHeader=req.headers.authorization

    if(!authHeader){
        res.status(401).json({
            "message":"Unauthorized access",
            "status":false
        })
    }

    const token=authHeader.split(' ')[1]  
    try {

        const {user_id,email}=await jwt.verify(token,"thisismysecret")
        const user={
            user_id,
            email
        }
        req.user=user
        next()

    } catch (error) {
        res.status(401).json({
            "message":"Unauthorized access",
            "status":false
        })

    }  

}

module.exports=auth

