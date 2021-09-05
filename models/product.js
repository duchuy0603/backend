import mongoose from 'mongoose';
const {ObjectId}=mongoose.Schema;
const productSchema = mongoose.Schema({
    name: {
        type: String,
        strim: true,
        maxLength: 32,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 2000
    },
    photo: {
        data: Buffer,
        contentType: String
    },

    price: {
        type: Number,

    },
    categoryId:{
        type:ObjectId,
        ref:"categories",
        required: true

    },
    shipping: {
        required: true,
        type: Boolean
    },
    sold: {
        type: Number,
        default: 0
    },
    quantity:{
        type: String,
        // required: true,
        maxLength: 2000
    },
    status:{
        type: String,
        // required: true,
        maxLength: 2000
    }
   
}, { timeStamps: true });
module.exports = mongoose.model("product", productSchema);