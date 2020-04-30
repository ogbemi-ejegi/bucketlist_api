const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const {registerValidation, loginValidation} = require('../validation');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// router.get('/', (req, res) => {
//     res.send('Hello');
// });

router.post('/err', (req, res) => {
    const username = req.body.username;
    res.send(username);
});
router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);
    if(error) {
        return res.status(400).send({message: error.details[0].message})
    } else {
        //Check if password match
        const {username, email, password, passwordAgain} = req.body;
        if (password !== passwordAgain) return res.status(400).send({message:'Passwords do not match'});

        //Check if user already exists
         userExist = await User.findOne({
             username: req.body.username
         });
         if (userExist) return res.status(400).send({message:'Username already exist'});

         //crypt our password
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);
    
       //initialize new user
         const newUser = new User({
             username,
             email,
             password: hashedPassword
         });
    
        //save user in database
        try {
            const savedUser = await newUser.save();
            res.send({userId: savedUser._id, message: "User successfully registered"});
        } catch (error) {
            res.status(400).send({error:error});
        }
    }
});

//Login route
router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send({error: error.details[0].message});

    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).send({message: 'Invalid username or password'});

    //check if password is correct
    validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send({message: 'Invalid username or password'});

    //create jwt
    const token = jwt.sign({id:user._id, username: user.username}, process.env.TOKEN_SECRET,{
        expiresIn: '1h'
      });
    //res.header('auth_token', token).send(token);
    res.cookie('auth', token);
    res.send(token);
})

module.exports = router;