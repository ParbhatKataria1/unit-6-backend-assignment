const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors')
const { connection } = require('./db');
const { auth } = require('./routes/auth.routes');
const { note } = require('./routes/notes.routes');
dotenv.config();
app.use(cors())

app.use(express.json())
app.use('/auth', auth);
app.use('/notes', note )

app.listen(process.env.port, async(req,res)=>{
    try {
        await connection;
        console.log('server is running', process.env.port)
    } catch (error) {
        console.log(process.env.mongoURL, process.env.port)
        console.log('server is not running')
    }
})