const express = require("express");
const bodyParser = require("body-parser");
const blogRouter = require('./routes/blogRoutes')
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.use('/',blogRouter)


module.exports = app;