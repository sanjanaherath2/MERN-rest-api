 const express = require("express");
 const router = express.Router();
 const bcrypt = require("bcryptjs");
 const jwt = require("jsonwebtoken");
 const keys = require("../../config/keys");

// Load input validation
 const validateRegisterInput = require("../../validation/register");
 const validateLoginInput = require("../../validation/login");

 // Load Post model
const Post = require("../../models/Post");


 router.post("/newpost", (req, res) => {

  var token = req.headers['x-access-token'];
 
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, keys.secretOrKey, function(err, decoded) {
    if (err){
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    }
    else{
      console.log("success");

      const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        category_id: req.body.category_id,
        remarks: req.body.remarks
      });


         newPost
         .save()
         .then(post => res.json(post))
         .catch(error => console.log(error))
    }
  });
  
 

   });
  

  module.exports = router;

  // // @route POST api/users/register
// // @desc Register user
// // @access Public
//     // Form validation
  
//   const { errors, isValid } = validateRegisterInput(req.body);
  
//   // Check validation
//     if (!isValid) {
//       return res.status(400).json(errors);
//     }
  
//   User.findOne({ email: req.body.email }).then(user => {
//       if (user) {
//         return res.status(400).json({ email: "Email already exists" });
//       } 
//   // Hash password before saving in database
//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser
//               .save()
//               .then(user => res.json(user))
//               .catch(err => console.log(err));
//           });
//         });
//       });
//     });

// // @route POST api/users/login
// // @desc Login user and return JWT token
// // @access Public
// router.post("/login", (req, res) => {
//     // Form validation
  
//   const { errors, isValid } = validateLoginInput(req.body);
  
//   // Check validation
//     if (!isValid) {
//       return res.status(400).json(errors);
//     }
  
//   const email = req.body.email;
//     const password = req.body.password;
  
//   // Find user by email
//     User.findOne({ email }).then(user => {
//       // Check if user exists
//       if (!user) {
//         return res.status(404).json({ emailnotfound: "Email not found" });
//       }
  
//   // Check password
//       bcrypt.compare(password, user.password).then(isMatch => {
//         if (isMatch) {
//           // User matched
//           // Create JWT Payload
//           const payload = {
//             id: user.id,
//             name: user.name
//           };
  
//   // Sign token
//           jwt.sign(
//             payload,
//             keys.secretOrKey,
//             {
//               expiresIn: 31556926 // 1 year in seconds
//             },
//             (err, token) => {
//               res.json({
//                 success: true,
//                 token: "Bearer " + token
//               });
//             }
//           );
//         } else {
//           return res
//             .status(400)
//             .json({ passwordincorrect: "Password incorrect" });
//         }
//       });
//     });
//   });
  