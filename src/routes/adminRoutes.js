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

module.exports = (nav, mongoUrl) => {
  adminRouter.route('/addBooks').get((req, res) => {
    mongodb.connect(mongoUrl, (err, db) => {
      const collection = db.collection('books');
      collection.insertMany(books, (err, results) => {
        res.send(results); 
        db.close(); 
      });
    });
  });
  return adminRouter; 
};


