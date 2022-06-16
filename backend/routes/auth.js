const { json } = require('express');
const bcrypt = require('bcryptjs');
const express = require('express');
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middlewear/fetchuser');

const JWT_SECRET="RushiBhauSaglyatBhariJaiHo"

const routes=express.Router();


// Post req for creating new user
routes.post('/createNewUser',[  // validation using express-validator
    body('name',"Name Should be of minimum length 3").isLength({ min: 3 }),
    body('email',"Enter Valid Email").isEmail(),
    body('password',"Password Should be of minimum length 5").isLength({ min: 5 }),
],async (req,res)=>{
    const errors = validationResult(req);  // result of validation
    // if their are errors in validation return status code 400
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    let user=await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).send("User with This email aldready exists");
    }
    const salt=await bcrypt.genSalt(10);
    const securedPass=await bcrypt.hash(req.body.password,salt);
    user= await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      })
      //if we are not using async await then we have to use .then.catch
      // .then(user => res.json(user))
      // .catch(err=>{
      //   console.log(err); 
      //   res.json({
      //       error:"Email should be Unique",
      //       message:err.message,
      //   })
      // });


      // res.send(user);


      // Sending token using jwt
      const data={
        user:{
          id:user.id
        }
      }
      const authToken=jwt.sign(data,JWT_SECRET);

      res.send({authToken});
    }catch(err){
      console.log(err.message);
      res.status(500).send("Internal Server Error");
    }
});


// Post req for user login
routes.post('/login',[  // validation using express-validator
    body('email',"Enter Valid Email").isEmail(),
    body('password',"Password Cannot be Blank").exists(),
],async (req,res)=>{
    const errors = validationResult(req);  // result of validation
    // if their are errors in validation return status code 400
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
          return res.status(400).send("user:Please Enter Correct credential");
        }
        const passCheck=await bcrypt.compare(password,user.password);
        if(!passCheck){
          return res.status(400).send("pass:Please Enter Correct credential");
        }
        const data={
          user:{
            id:user.id
          }
        }
        const authToken=jwt.sign(data,JWT_SECRET);

        res.send({authToken});
    }catch(err){
      console.log(err.message);
      res.status(500).send("Internal Server Error");
    }
});

routes.post('/getuser',fetchuser,async(req,res)=>{
  try {
    const userId=req.user.id;
    const user=await User.findById(userId).select('-password');
    res.send(user);
  } catch (error) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports=routes;