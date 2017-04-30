var express = require('express');
var authRouter = express.Router(); 
var mongodb = require('mongodb').MongoClient; 
var passport = require('passport'); 

module.exports = (mongoUrl) => {
  authRouter.route('/signUp')
    .post((req, res) => {
      mongodb.connect(mongoUrl, (error, db) => {
        if (error) {
          console.log(`Could not connect to MongoDB`);
        }
        const collection = db.collection('users'); 
        const user = { username: req.body.userName,  password: req.body.password }; 

        collection.insert(user, (err, results) => {
          req.logIn(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        });
      });      
    });
  authRouter.route('/signIn')
    .post(passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
      res.redirect('/auth/profile'); 
    }); 
  authRouter.route('/profile')
    .all((req, res, next) => {
      if(!req.user) {
        res.redirect('/');
      }
      next();
    })
    .get((req, res) => {
      res.json(req.user); 
    });

    return authRouter; 
};


