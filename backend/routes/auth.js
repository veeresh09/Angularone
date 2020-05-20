const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Account created",
          result: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      });
  });
});

router.post("/login",(req,rws,next)=>{
  let fetchedUser;
  User.findOne({email:req.body.email}).then(user=>{
    if(!user){
      return res.status(404).json({
        message :"Account Not found"
      })
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password,user.password);
  }).then(result=>{
    if(!result){
     return res.status(404).json({
        message :"Authentication failed"
      })
    }
    const token = jwt.sign({email : fetchedUser.email,userId = fetchedUser._id},'some-random*long-string',{expiresIn:'1h'});
    res.status(200).json({
      token:token
    })
  }).catch(err=>{
   return res.status(401).json({
      message :"Unable to login"
    })
  })
})
module.exports = router;
