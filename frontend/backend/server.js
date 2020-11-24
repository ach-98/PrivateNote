const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config();

const webApp = express();
const port = process.env.PORT || 7000;

webApp.use(cors());
webApp.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

webApp.use(passport.initialize());
//require('passport')(passport);

const usersRouter = require('./routes/users');
const notesRouter = require('./routes/notes');

webApp.use('/notes', notesRouter);
webApp.use('/users', usersRouter);

webApp.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});