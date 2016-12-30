var express = require('express');

var bookRouter = express.Router(); 

var books = [
    {
        title: 'War and Peace', 
        author: 'Leo Tolstoi'
    }, 
    {
        title: 'Ulysses', 
        author: 'James Joyce'
    },
    {
        title: 'Crime and Punishment', 
        author: 'Fyodor Dostoyevsky'
    },
    {
        title: 'The Rainbow', 
        author: 'DH Lawrence'
    }
]; 

bookRouter.route('/')
    .get(function(req, res){
        res.render('books', {
            title: 'Books', 
            nav: [{
                Link:'/Books', 
                Text: 'Books'
            }, {
                Link:'/Authors', 
                Text: 'Authors'
            }],
            books: books
            }); 
    });

bookRouter.route('/single')
    .get(function(req, res) {
        res.send('Hello single books'); 
    });

module.exports = bookRouter; 