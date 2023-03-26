const express = require('express');
const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    email:{type:String,unique:true, isrequired:true},
    username:{type:String, unique:true, isrequired:true},
    age:{type:Number, unique:true, isrequired:true},
    pass:{type:String, unique:true, isrequired:true}
}, {
    versionKey:false
})

const AuthModel = mongoose.model('user', authSchema);

module.exports = {AuthModel}