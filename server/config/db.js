const mongoose = require('mongoose')
function connectDB(){
    mongoose.connect('mongodb://0.0.0.0:27017/Homestay',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("Database connected Successfull");
        console.log("http://localhost:7000");
    })
    .catch((err)=>{
        console.log("database error \n" +err);
    })
}
module.exports =connectDB;