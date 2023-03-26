const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title:String,
    description:String,
    userId:String
}, {
    versionKey:false
})

const NotesModel = mongoose.model('note', noteSchema)

module.exports = {NotesModel}

