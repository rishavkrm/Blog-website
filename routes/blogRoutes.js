const express = require('express')
const app = express()
const Blog = require('./../models/blogModel')
const catchAsync = require('./../utils/catchAsync');
const bodyParser = require("body-parser");
const authController = require('./../controllers/authController');
// const User = require('./../models/userModel');


const homeStartingContent = require('./../contents/homeStartingContent')
const aboutContent = require('./../contents/aboutContent ')
const contactContent = require('./../contents/contactContent')

// 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// 

// 
const Router = express.Router()
Router.route('/')
.get(catchAsync(async(req,res)=>
{ 
  if(req.cookies.jwt){button = 'Logout'}
  else{button = 'Login'}
    array_posts = await Blog.find({})
    
    // res.render("home",{homeheadStartingContent:homeStartingContent,homeStartingContent:array_posts,link:"/posts/"});
    res.render("home",{homeheadStartingContent:homeStartingContent,homeStartingContent:array_posts,link:"/posts/","loginORlogout":button});


}))

// single blog
Router.route('/posts/:title')
.get(catchAsync(async(req,res)=>{
    var title = req.params.title;
    if(req.cookies.jwt){button = 'Logout'}
  else{button = 'Login'}
    var blog = await Blog.findOne({title:title});
    if(blog){
      res.status(200).render("post",{Title:title,Content:blog.content,"loginORlogout":button});
    }
    else{
      res.status(404)
    }
  }));
  
// about
Router.route('/about')
.get(function(req,res)
  {
    if(req.cookies.jwt){button = 'Logout'}
  else{button = 'Login'}
    res.render("about",{aboutStartingContent:aboutContent,"loginORlogout":button});
  })


// contact
Router.route('/contact')
.get(function(req,res)
  {
    if(req.cookies.jwt){button = 'Logout'}
  else{button = 'Login'}
    res.render("contact",{contactStartingContent:contactContent,"loginORlogout":button});
  })
  


Router.route('/compose')
.get( authController.protect,authController.restrictTo('admin'),(req,res)=>
  {
  if(req.cookies.jwt){button = 'Logout'}
  else{button = 'Login'}
    res.render("compose",{"loginORlogout":button});
  
  })
.post(catchAsync(async(req,res)=>{
    var title = req.body.title;
    var content = req.body.content;
    const doc = await Blog.create({title:title,content:content});
    res.status(201).redirect('/');
}
 ))

 module.exports = Router