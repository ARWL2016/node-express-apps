var express = require('express');
var bookRouter = express.Router(); 
var mongodb = require('mongodb').MongoClient; 
var objectId = require('mongodb').ObjectID; 

module.exports = (nav, mongoUrl) => {
  var bookService = require('../services/goodreadsService')();
  var bookController = require('../controllers/bookController')(bookService, nav, mongoUrl);
  bookRouter.use(bookController.middleware); 
  bookRouter.route('/')
    .get(bookController.getIndex); 

  bookRouter.route('/:id')
      .get(bookController.getById); 

  return bookRouter; 
};

