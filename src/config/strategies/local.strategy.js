var passport = require('passport'), 
    LocalStrategy  = require('passport-local').Strategy, 
    mongodb = require('mongodb').MongoClient; 

module.exports = (mongoUrl) => {
  passport.use(new LocalStrategy({
    usernameField: 'userName', 
    passwordField: 'password'
  }, (username, password, done) => {

      mongodb.connect(mongoUrl, (err, db) => {
        const collection = db.collection('users'); 
        collection.findOne({ username: username }, (err, results) => {
            if (!results) {
              done(null, false, {message: 'User not found'});
            } else if (results.password === password) {
              const user = results; 
              done(null, user);
            } else {
              done(null, false, {message: 'Bad password'});
            }  
          }
        );
      });
  }));
};
