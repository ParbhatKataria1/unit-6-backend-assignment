const express = require('express');
const { decode } = require('jsonwebtoken');
const { NotesModel } = require('../model/notes.model');
const note = express.Router();
const jwt = require('jsonwebtoken')


note.use((req, res, next)=>{
    let token = req.headers.authorization;
    jwt.verify(token, 'user', (err, decoded)=>{
        if(err){
            console.log(err, 'this is condole')
            res.status(400).send("token provided is wrong")
        }
        if(decoded['_id']){
            req.body.userId = decoded['_id'];
            next();
        }
    })
    // res.status(400).send("token provided is wrong or not able to track the token")
})

note.post('/', async(req, res)=>{
    try {
        let data = new NotesModel(req.body);
        await data.save();
        res.status(200).send('note has been added');
    } catch (error) {
        res.status(400).send("not able to add the note")
    }
})

note.get('/', async(req, res)=>{
    const {userId} = req.body;
    try {
        let data = await NotesModel.find({userId});
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send("not able to get the note")
    }
})

note.delete('/:_id', async(req,res)=>{
    let {_id} = req.params;
    let {userId} = req.body;
    console.log({_id, userId})
    try {
        await NotesModel.findOneAndDelete({_id,userId});
        res.status(200).send("item is deleted from the database")
    } catch (error) {
        res.status(400).send("not able to delete the item from the database")
    }

})

note.patch('/:_id', async(req,res)=>{
    let {_id} = req.params;
    let {userId, title, description} = req.body;
    try {
        // console.log(_id, userId, title, description )
        let data = await NotesModel.findOneAndUpdate({_id, userId}, req.body, {new:true});
        console.log(data)
        res.status(200).send("item is patched from the database")
    } catch (error) {
        res.status(400).send("not able to patch the item from the database")
    }

})

note.put('/:_id', async(req,res)=>{
    let {_id} = req.params;
    // let {userId, title, description} = req.body;
    try {
        const data = await NotesModel.findOneAndReplace({_id, userId}, req.body, {new:true});
        console.log(data, 'tis')
        res.status(200).send("item is deleted from the database")
    } catch (error) {
        res.status(400).send("not able to delete the item from the database")
    }

})

module.exports = {note}