const User = require('../models/user-model');
const bcrypt = require('bcryptjs'); 

exports.updateUser = async (req,res) => {
    try{
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 12)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          });
        res.status(201).send(updatedUser);
    } catch (err) {
        res.status(404).send(err)
    }
}

exports.deleteUser = async (req,res) => {
    try{
        await User.findByIdAndRemove(req.params.id);
        return res.status(201).send("User deleted !");        
    } catch (err){
        res.status(404).send(err)
    }
}

exports.getUser = async (req,res) => {
    try{
        const user = await User.findById(req.params.id).select("-password -__v");
        return res.status(201).send(user);        
    } catch (err){
        res.status(404).send(err)
    }
}

exports.getUsers = async (req,res) => {
    try{
        const users = await User.find().select("-password -__v");
        return res.status(201).send(users);        
    } catch (err){
        res.status(404).send(err)
    }
}