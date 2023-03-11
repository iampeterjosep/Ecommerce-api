const User =  require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    signUp: async( req, res) =>{
        const {email} = req.body;

        try{
            //check if user exists
        const user =  await User.findOne({email});
        if(user) return res.status(403).json(`User with ${email} already exists!`);

        //sign new user

        //hash password 
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPass
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        }catch(err){
            res.status(500).json(err);
        }
    },
    signIn: async(req, res)=>{
        
        const {email} = req.body;
        try{
            //check if user exists
            const user = await User.findOne({email});
            if(!user) return res.status(401).json("Invalid username or password");

            //check if password match
            const validMatch =  await bcrypt.compare(req.body.password, user.password);
            if(!validMatch) return res.status(401).json("Invalid username or password");

            const {password, ...others} = user._doc;

            //jwt sign
            const token = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, process.env.JWT_SEC);

            res.status(200).json({...others, token});
        }catch(err){
            res.status(500).json(err);
        }
    }
}