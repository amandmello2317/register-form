const mongoose = require('mongoose')

const {Schema} = mongoose

const ProductSchema = new Schema({
    name:{
        type:String
    },
    number: {
        type:String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

    
})
module.exports = mongoose.model("Product", ProductSchema)