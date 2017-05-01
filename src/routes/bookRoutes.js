var express = require('express');
var bookRouter = express.Router(); 
var mongodb = require('mongodb').MongoClient; 
var objectId = require('mongodb').ObjectID; 

module.exports = (nav, mongoUrl) => {
  const bookService = require('../services/goodreadsService')();
  const { middleware, getIndex, getById } = require('../controllers/bookController')(bookService, nav, mongoUrl);
  bookRouter.use(middleware); 
  bookRouter.route('/')
    .get(getIndex); 

  bookRouter.route('/:id')
      .get(getById); 

  return bookRouter; 
};

