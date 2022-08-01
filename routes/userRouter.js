const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();


// 

router
  .route('/signup')
  .get((req,res)=>{
    console.log(req)
    if(req.cookies.jwt){button = 'LOGOUT'}
else{button = 'LOGIN'}
    res.render("register",{"loginORlogout":button})})
  .post(authController.signup);

router
  .route('/login')
  .get((req,res)=>{res.render("login",{"loginORlogout":button})})
  .post(authController.login);

router.get('/logout', authController.logout);

router
  .route('/forgotPassword')
  .get((req,res)=>{res.render("forgot",{"loginORlogout":button})})
  .post(authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
