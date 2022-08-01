const express = require("express");
const bodyParser = require("body-parser");
const blogRouter = require('./routes/blogRoutes')
const userRouter = require('./routes/userRouter')
const app = express();
const cookieParser = require('cookie-parser')

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

app.use('/',blogRouter)
app.use('/user',userRouter)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  
app.use(globalErrorHandler);
  
module.exports = app;

