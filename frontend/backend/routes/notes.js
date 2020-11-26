const router = require('express').Router();
let Note = require('../models/notes.model');

router.route('/').get((req, res) => {
    Note.find({username: req.query.username})
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
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

    newNote.save()
        .then(() => res.json('Note added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Note.findById(req.params.id)
        .then(note => res.json(note))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(() => res.json('Note deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            note.username = req.body.username;
            note.title = req.body.title;
            note.category = req.body.category;
            note.text = req.body.text;
            note.date = Date.parse(req.body.date);

        note.save()
            .then(() => res.json('Note updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;