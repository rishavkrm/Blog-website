const express = require('express')
const Blog = require('./../models/blogModel')

exports.createBlog = catchAsync(async (req, res, next) => {
var title = req.body.title;
var content = req.body.content;
const doc = await Blog.create({title:title,content:content});
res.status(201).redirect('/');
});
