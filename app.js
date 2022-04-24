const express=require('express')
const app=express()

app.use(express.json())

//database connection
require('./database/connection')

//importing routes here
const routes=require('./routes/routes')
app.use('/post',routes)


//configuring server and listening at port 
const PORT=3000
app.listen(3000,(error,result)=>{
    if(error) throw error
    console.log(`Server is listening at PORT:${PORT}`);
})