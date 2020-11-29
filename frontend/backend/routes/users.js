const express = require('express');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let User = require("../models/user.model");

// Logs the user out of the notes application.
router.route('/logout').post((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

// Logs user in to the application.
router.route('/login').post((req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    // Checks for the user in the database.
    User.findOne({username})
        .then(user => {
            if (!user) {return res.status(404).json({usernotfound: "User not found" + username});
        }

        // Found user, so verifies the password.
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: user.id,
                        username: user.username
                    }; 
        
                    // Returns a token to show successful login.
                    jwt.sign(
                         payload,
                         "secret",
                         {
                            expiresIn: 31556926
                         },
                         (err, token) => {
                             res.json({
                                 success: true,
                                 token: "Bearer" + token
                             });
                         }
                     );

                } else {

                    // Unsuccessful login, password incorrect.
                    return res
                        .status(400)
                        .json({passwordincorrect: "Password incorrect."});
                }
        });
    });
});

// Adds new user to the database.
router.route('/add').post((req, res) => {

    // Determines if username is already taken since must be unique.
    User.findOne({username: req.body.username})
        .then(user => {if (user) {return res.status(400).json({username: "Username already taken."});
        } else {

            // Username not taken so create new user with specified login credentials.
            const newUser = new User({
                username: req.body.username,
                password: req.body.password
            });
        
        // Encrypts user's password to store in the database.
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;

                // Saves new user to the database.
                newUser.save()
                    .then(() => res.json('User added!'))
                    .catch(err => res.status(400).json('Error: ' + err));
                });
            });
        }
    });
});

// Changes a user's password.
router.route('/change').post((req, res) => {

    const username = req.body.username;
    const currentpassword = req.body.currentpassword;
    const newpassword = req.body.newpassword;

    // Finds the user in the database.
    User.findOne({username})
        .then(user => {
            if (!user) {return res.status(404).json({usernotfound: "User not found" + username});
        }
        
        // Checks that the old password matches what the user input.
        bcrypt.compare(currentpassword, user.password)
            .then(isMatch => {
                if (isMatch) {
    
                    user.username = user.username;
                    user.password = newpassword;
                
                    // Encrpyts new password.
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(user.password, salt, (err, hash) => {
                            if (err) throw err;
                            user.password = hash;

                            // Saves user's new password and updates the database.
                            user.save()
                                .then(() => res.json('User account updated!'))
                                .catch(err => res.status(400).json('Error: ' + err));
                        });
                    });
                        
                } else {

                    // User input incorrect login credentials for password change verification.
                    return res
                        .status(400)
                        .json({passwordincorrect: "Password incorrect."});
                }
        }); 
    });
});

module.exports = router;