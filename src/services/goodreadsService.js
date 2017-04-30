var http = require('http'); 
var xml2js = require('xml2js'); 
var parser = xml2js.Parser({explicitArray: false});

// note that API key is invalid

module.exports = () => {

  const getBookById = (id, cb) => {
    
    const options = {
      host: 'www.goodreads.com', 
      path: '/book/show/656?format=xml&key=mN1DyVoFS4cfbCMh5HmnpA'
    };

    http.request(options, (res) => {
      let string = ''; 
      res.on('data', (chunk) => {
        string += chunk; 
      }); 
      res.on('end', () => {
        console.log(string); 
        parser.parseString(string, (err, result) => {
          cb(null, result.GoodreadsResponse.book);
        });
      });
    }).end();

  };
  return { getBookById };
};

 
