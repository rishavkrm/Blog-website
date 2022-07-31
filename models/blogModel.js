const mongoose = require('mongoose')
blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please give a title to your post'],
        trim:true
    },
    content:{
        type:String,
        required:[true,'Add something to body.'],
        trim:true
    }
})

const Blog = new mongoose.model('Blog',blogSchema)
module.exports = Blog