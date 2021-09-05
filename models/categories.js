import mongoose from 'mongoose';
const cateSchema=mongoose.Schema({
    name:{
       type: String,
       strim : true,
       maxLength:32,
       required: true
    }
}, { timeStamps: true });
module.exports = mongoose.model("categories",cateSchema);