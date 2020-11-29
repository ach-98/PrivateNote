const router = require('express').Router();
let Note = require('../models/notes.model');

// Retrieves the notes from database to show on the note list page.
router.route('/').get((req, res) => {
    
    // Only loads notes for the specified user.
    Note.find({username: req.query.username})
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Adds new notes to the database.
router.route('/add').post((req, res) => {

    // Takes user input for each field.
    const username = req.body.username;
    const title = req.body.title;
    const category = req.body.category;
    const text = req.body.text;
    const date = Date.parse(req.body.date);

    const newNote = new Note({
        username,
        title,
        category,
        text,
        date,
    });

    // Saves new note to database.
    newNote.save()
        .then(() => res.json('Note added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Retrieves note to be edited.
router.route('/:id').get((req, res) => {
    Note.findById(req.params.id)
        .then(note => res.json(note))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Retrieves note to be deleted and deletes it.
router.route('/:id').delete((req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(() => res.json('Note deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Retrieves note to be edited and saves changes.
router.route('/update/:id').post((req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            note.username = req.body.username;
            note.title = req.body.title;
            note.category = req.body.category;
            note.text = req.body.text;
            note.date = Date.parse(req.body.date);

        // Saves changes made by user and sends to database.
        note.save()
            .then(() => res.json('Note updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;