const { User } = require('../models/user-model');
const bcrypt = require('bcryptjs'); 

exports.updateUser = async (req,res, next) => {
    try{
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 12)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          });
        res.status(201).send(updatedUser);
    } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
}

exports.deleteUser = async (req, res, next) => {
    try{
        await User.findByIdAndRemove(req.params.id);
        return res.status(201).send("User deleted !");        
    } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
}

exports.getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id).select("-password -__v -cart -orders -isAdmin");
        return res.status(201).send(user);        
    } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
}

exports.getUsers = async (req, res, next) => {
    try{
        const users = await User.find().select("-password -__v");
        return res.status(201).send(users);        
    } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
}