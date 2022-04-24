const Sequelize=require('sequelize')
const sequelize=new Sequelize('node_training_api','root','',{
    host:'localhost',
    dialect:'mysql'
})

sequelize.authenticate()
.then(()=>{
    console.log('Database connected successfully !!!');
})
.catch((error)=>{
    console.log(error);
})

module.exports=sequelize