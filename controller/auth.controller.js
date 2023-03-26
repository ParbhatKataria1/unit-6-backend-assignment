

const bcrypt = require('bcrypt');
const { AuthModel } = require('../model/auth.model');
const jwt = require('jsonwebtoken');

const register = async(req,res)=>{
    let {username, pass, email, age} = req.body;
    try {
        bcrypt.hash(pass, 5, async(err, hash)=>{
            if(hash){
                let user = new AuthModel({username, pass:hash, email, age});
                await user.save();
                res.status(200).send("user is registered in database")
            }
            if(err){
                res.status(400).send('error in creating hash of the pass while registering')
            }
        })
    } catch (error) {
        res.status(400).send('not able to register the user data')
    }
}

const login =  async(req, res)=>{
    let {username, pass} = req.body;
    try {
        let {pass:hash, _id} = await AuthModel.findOne({username});
        bcrypt.compare(pass, hash, (err, result)=>{
            if(result){
                res.status(200).send({"msg":"user is successfully logged in", "token":jwt.sign({_id}, 'user')})
            }
            if(err){
                res.status(400).send({"msg":'not able to compare the typed password with hashed password'})
            }
        })
    } catch (error) {
        res.status(400).send({"msg":"credentials do not match with the database"})
    }
}


module.exports = {login, register}