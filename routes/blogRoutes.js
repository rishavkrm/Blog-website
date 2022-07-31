const express = require('express')
const app = express()
const Blog = require('./../models/blogModel')
const catchAsync = require('./../utils/catchAsync');
const bodyParser = require("body-parser");

const homeStartingContent = require('./../contents/homeStartingContent')
const aboutContent = require('./../contents/aboutContent ')
const contactContent = require('./../contents/contactContent')

// 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// 
const Router = express.Router()
Router.route('/')
.get(catchAsync(async(req,res)=>
{
    array_posts = await Blog.find({})
    res.render("home",{homeheadStartingContent:homeStartingContent,homeStartingContent:array_posts,link:"/posts/"});

}))

// single blog
Router.route('/posts/:title')
.get(catchAsync(async(req,res)=>{
    var title = req.params.title;
    var blog = await Blog.findOne({title:title});
    if(blog){
      res.status(200).render("post",{Title:title,Content:blog.content});
    }
    else{
      res.status(404)
    }
  }));
  
// about
Router.route('/about')
.get(function(req,res)
  {
    res.render("about",{aboutStartingContent:aboutContent});
  })


// contact
Router.route('/contact')
.get(function(req,res)
  {
    res.render("contact",{contactStartingContent:contactContent});
  })
  

// compose blog
Router.route('/compose')
.get(function(req,res)
  {
    res.render("compose");
  
  })
.post(catchAsync(async(req,res)=>{
    var title = req.body.title;
    var content = req.body.content;
    const doc = await Blog.create({title:title,content:content});
    res.status(201).redirect('/');
}
 ))

 module.exports = Router