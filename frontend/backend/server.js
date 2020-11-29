const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const webApp = express();
const port = process.env.PORT || 7000;

webApp.use(cors());
webApp.use(express.json());

// Next few lines establish connection to MongoDB database.
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// Connects routes.
const usersRouter = require('./routes/users');
const notesRouter = require('./routes/notes');

// Tells app to use the routes.
webApp.use('/notes', notesRouter);
webApp.use('/users', usersRouter);

webApp.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});