const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        maxlength: 2000
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;