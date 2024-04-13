const mongoose  = require("mongoose");

const destinationSchema=mongoose.Schema({
    image:{type:String,required:true},
    destination:{type:String,required:true},
    add:{type:String,required:true},
    categories:{type:String,required:true},
    des:{type:String,required:true},
    loc:{type:String,required:true}
})

const destinationList = mongoose.model("destinationList",destinationSchema);
module.exports =destinationList;