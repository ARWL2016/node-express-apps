var passport = require('passport'); 

module.exports = (app, mongoUrl) => {
  app.use(passport.initialize()); 
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user); 
  });

  passport.deserializeUser((user, done) => {
    done(null, user); 
  });

  require('./strategies/local.strategy')(mongoUrl); 
};

 
