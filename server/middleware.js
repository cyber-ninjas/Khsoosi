const express = require('express');
const jwt = require('jsonwebtoken');
const  SECRET_KEY  = "any string"

const authenticate = function(req, res, next){

    const { token } = req.cookies;
    if(!token){
        return res.status(401).send('Please sign in');
    }
    jwt.verify(token, SECRET_KEY, function(err, decodedToken){
        //If err, token invalid
        if(err){
            return res.status(401).send('Please sign in');
        }
        //Check if email exists in the database
        const email = decodedToken.email;
        User.findOne({where:{email}}).then(function(user){
            if(!user){
                return res.status(401).send('Please sign up');
            }
            req.body.user = {email:user.email}; 
            return next();
        }).catch(function(err){
            return res.status(500).send(err);
        })
    });
};
exports.authenticate = authenticate;