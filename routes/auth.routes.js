const express = require('express');
const auth = express.Router();
const { register, login } = require('../controller/auth.controller');


auth.post('/register',register)

auth.post('/login', login)

module.exports = {auth}