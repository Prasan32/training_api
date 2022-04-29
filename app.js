const express=require('express')
const app=express()
const swaggerJsDoc=require('swagger-jsdoc')
const swaggerUi=require('swagger-ui-express')

const swaggerOptions={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Nodejs API training',
            version:'1.0.0',
            description:'API development using swaggerui documentation',
            contact:{
                name:"Prasanna KB",
                url:"www.google.com",
                email:"prasannakb440@gmail.com"
            },
            servers:["http://localhost:3000"]
        }
    },
    apis:['./routes/routes.js']
}

const swaggerDocs=swaggerJsDoc(swaggerOptions)

app.use(express.json())

//database connection
require('./database/connection')

//importing routes here
const routes=require('./routes/routes')
const authRoutes=require('./routes/auth')
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))
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