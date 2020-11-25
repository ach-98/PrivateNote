const express = require('express');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let User = require("../models/user.model");
const passport = require('passport');
const { default: Axios } = require('axios');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

// changed
router.route('/login').post((req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username})
        .then(user => {
            if (!user) {return res.status(404).json({usernotfound: "User not found" + username});
        }

        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: user.id,
                        username: user.username
                    };
        
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
                    return res
                        .status(400)
                        .json({passwordincorrect: "Password incorrect."});
                }
        });
    });
});

router.route('/add').post((req, res) => {

    User.findOne({username: req.body.username})
        .then(user => {if (user) {return res.status(400).json({username: "Username already taken."});
        } else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password
            });
    
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(() => res.json('User added!'))
                    .catch(err => res.status(400).json('Error: ' + err));
                });
            });
        }
    });
});
/*
router.route('/change').post((req, res) => {

    const username = req.body.username;
    const currentpassword = req.body.currentpassword;
    const newpassword = req.body.newpassword;

    User.findOne({username})
        .then(user => {
            if (!user) {return res.status(404).json({usernotfound: "User not found" + username});
        }
        /*
        bcrypt.compare(currentpassword, user.password)
            .then(isMatch => {
                if (isMatch) {
                    user = {
                        user.username: user.username,
                        user.password: req.body.password
                    };
        
                        
                } else {
                    return res
                        .status(400)
                        .json({passwordincorrect: "Password incorrect."});
                }
        });
    });
});
*/

module.exports = router;