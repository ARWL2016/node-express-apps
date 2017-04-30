var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

module.exports = (bookService, nav, mongoUrl) => {
  const middleware = (req, res, next) => {
    if (!req.user) {
      res.redirect('/');
    }
    next();
  };
  const getIndex = (req, res) => {
      mongodb.connect(mongoUrl, (err, db) => {
          const collection = db.collection('books');
          collection.find({}).toArray((err, results) => {
            res.render('bookListView', { title: 'Books', nav: nav,  books: results });
          });
      });
  };

  const getById = (req, res) => {
      const id = new ObjectId(req.params.id);

      mongodb.connect(mongoUrl, (err, db) => {
          const collection = db.collection('books');

          collection.findOne({ _id: id }, (err, results) => {
            if (results.bookId) {
              bookService.getBookById(results.bookId, (err, book) => {
                results.book = book;
                res.render('bookView', { title: 'Books', nav: nav, book: results });
              });
            } else {
              res.render('bookView', { title: 'Books',  nav: nav, book: results });
            }
          });
      });
  };
  
  return { getIndex, getById, middleware };
};


