const User =require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    updateUser: async (req, res) =>{
        try{

            if(req.body.password){
                const salt= await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
            res.status(200).json(updatedUser);
        }catch(err){
            res.status(500).json(err);
        }
    },
    deleteUser: async (req, res) =>{
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Account has been delete...')
        }catch(err){
            res.status(500).json(err);
        }
    },
    getUser: async (req, res) =>{
        try{
            const user = await User.findById(req.params.id);
            const {password, ...others} = user._doc;
            res.status(200).json({...others});
        }catch(err){
            res.status(500).json(err);
        }
    },
    getAllUsers: async (req, res) =>{
        const qnew = req.query.new;
       try{
        const users  = qnew ? await User.find().sort({_id: -1}).limit(1) : await User.find();
        res.status(200).json(users);
       }catch(err){
           res.status(500).json(err)
       }
    }
}