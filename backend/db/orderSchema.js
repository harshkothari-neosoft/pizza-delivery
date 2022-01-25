const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    details:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("order",orderSchema)