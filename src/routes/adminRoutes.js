var express = require('express');
var adminRouter = express.Router(); 
var mongodb = require('mongodb').MongoClient; 

var books = [
        {
            title: 'War and Peace', 
            author: 'Leo Tolstoi', 
            bookId: 656
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

var router = function (nav) {

    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 
            'mongodb://localhost:27017/libraryApp';

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.insertMany(books, 
                function(err, results) {
                    res.send(results); 
                    db.close(); 
                }
            );
        });

           // res.send('inserting books');
        });
    

    return adminRouter; 
};

module.exports = router; 
