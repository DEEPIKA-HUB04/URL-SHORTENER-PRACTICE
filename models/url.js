const mongoose = require('mongoose')
const urlSchema = mongoose.Schema({

    longUrl : {
        type:String,
        required : true
    },

    shortUrl :{
        type : String
       
    },
    click : {
        type : Number,
        default : 0
    }
})

const urlModel = mongoose.model('urlShort',urlSchema)

module.exports = {urlModel}