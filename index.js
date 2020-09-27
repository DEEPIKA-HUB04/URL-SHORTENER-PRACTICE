const express = require('express')
const app = express()
const  bodyParser = require('body-parser')
const mongoose = require('mongoose')


mongoose.connect("mongodb://localhost:27017/myurlshortener")

const {urlModel} = require('./models/url')

//middleware
app.set('view engine',"ejs")
app.use(bodyParser.urlencoded({extended : true}))


app.get('/', function(req,res){

    let allUrl = urlModel.find(function(err,final){

        res.render("home" , {

            urlResult : final
        })

    })
})

app.post('/create',function(req,res){

   
    let urlShort = new urlModel ({

        longUrl : req.body.longurl,
        shortUrl : generateurl()
    })

    urlShort.save(function(err,data){
 
        if(err) throw err;

        res.redirect('/')


    })
})

app.get('/:urlId', function(req,res){

    urlModel.findOne({shortUrl:req.params.urlId},function(err,data){

        if(err) throw err

        urlModel.findByIdAndUpdate({_id:data.id},{$inc : {click : 1}} , function(err,updatedData){

            if(err) throw err
            res.redirect(data.longUrl)
        })
       
    })
    
})

app.get('/delete/:id',function(req,res){

urlModel.findByIdAndDelete({_id:req.params.id},function(err,deleteData){

    if(err) throw err;
    res.redirect('/')
})

})
app.listen(3000 , function(){


    console.log("port running at 3000")
})

function generateurl(){


    var result = ""
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  var charlength = characters.length

  for(var i =0 ;i<5;i++){

    result += characters.charAt(
        Math.floor(Math.random() *charlength)
    )
  }
  console.log(result)
return result
  
}


