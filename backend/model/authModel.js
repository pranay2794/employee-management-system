const mongoose=require('mongoose');

const authSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[  true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    department:{
        type:String,
        required:[true,'Department is required']
    },

},{timestamps:true});
module.exports=mongoose.model('Auth',authSchema);
