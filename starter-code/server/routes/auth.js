require('dotenv').config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const User = require("../models/user");
const uploadCloud = require('../config/cloudinary.js');
const mongoose = require("mongoose");
const Chatkit = require('@pusher/chatkit-server');

router.post("/signup", uploadCloud.single('picture'), function (req,res) {
    User.findOne({$or: [{username: req.body.username, email: req.body.email}]})
        .then((user)=> {
            if(user) res.send("Email or username is already taken")
            else {
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    if(err) res.send(err.message)
                    else {
                        User.create({
                            username: req.body.username,
                            password: hash,
                            email: req.body.email,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            location: req.body.location,
                            /* picture: req.file.url, 
                            skills: req.body.skills,
                            aboutme: req.body.aboutme, 
                            jobposition: req.body.jobposition */
                        })
                        .then((user)=> {
                            req.session.user = user
                            const chatkit = new Chatkit.default({
                                instanceLocator: `${process.env.INSTANCE_LOCATOR}`,
                                key: `${process.env.SECRET_CK_KEY}`
                            });
                            // Create user in the chat server Mikey Sandoval
                            chatkit.createUser({
                                id: user.id,
                                name: user.username
                            })
                            .then(() => {
                                console.log('User created');
                            })
                            .catch(err => {
                                console.log(err);
                            });

                            res.send({user})
                        })
                        .catch((err)=> {
                            res.send(err.message)
                        })
                    }
                })
            }
        })
    })   


router.post("/login", (req,res)=> {
    User.findOne({username: req.body.username})
        .then((user)=> {
            console.log(user)
            if(!user) res.status(403).send("Invalid credentials")
            else {
                console.log(req.body.password)
                bcrypt.compare(req.body.password, user.password, function(err, equal) {
                    if(err) res.send(err);
                    else if(!equal) {res.status(403).send("Invalid credentials");}
                    else {
                        req.session.user = user;
                        res.send(user);
                    }
                });
            }
        })
        .catch(err=> {
            res.send("error error", err);
        })
})


router.get("/logout", (req, res)=> {
    console.log("logout req received")
    req.session.destroy();
    res.send("Logout successful");
})

module.exports = router;