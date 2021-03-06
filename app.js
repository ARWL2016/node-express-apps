var express = require('express');
var bodyParser = require('body-parser'); 
var chalk = require('chalk'); 
var cookieParser = require('cookie-parser'); 
var passport = require('passport'); 
var session = require('express-session'); 

var app = express(); 
var port = process.env.PORT || 5000; 
const mongoUrl = 'mongodb://localhost:27017/libraryApp';

var nav = [
  { Link:'/Books', Text: 'Book'}, 
  { Link:'/Authors', Text: 'Author'}];
  
var bookRouter = require('./src/routes/bookRoutes')(nav, mongoUrl); 
var adminRouter = require('./src/routes/adminRoutes')(mongoUrl); 
var authRouter = require('./src/routes/authRoutes')(mongoUrl); 

app.use(express.static('public')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded()); 
app.use(cookieParser()); 
app.use(session({secret:'library'})); 

require('./src/config/passport.js')(app, mongoUrl); 


app.set('views', './src/views'); 
app.set('view engine', 'ejs'); 

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
 res.render('index', 
            {title: 'Hello from render', 
            nav: [{
                Link:'/Books', 
                Text: 'Books'
            }, {
                Link:'/Authors', 
                Text: 'Authors'}]
            });
        });

app.get('/books', function(req, res) {
    res.send('hello books');
});

app.listen(port, (err) => {
    console.log(chalk.green(`Running server on port ${port}`));
});
