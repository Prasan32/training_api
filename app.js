const express=require('express')
const app=express()

app.use(express.json())

//database connection
require('./database/connection')

//importing routes here
const routes=require('./routes/routes')
const authRoutes=require('./routes/auth')
app.use('/post',routes)
app.use(authRoutes)

//route not found
app.use((req,res,next)=>{
    res.status(404).json({
        "message":"Page Not found"
    })
})

//configuring server and listening at port 
const PORT=3000
app.listen(3000,(error,result)=>{
    if(error) throw error
    console.log(`Server is listening at PORT:${PORT}`);
})