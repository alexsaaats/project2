var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Test101!',
  database : 'saaatsmini'
});

var urllist = [];


//GET DATA ----------------------
connection.connect();
   
  connection.query('SELECT * FROM siteurls;', function (error, results, fields) {
    if (error) throw error;
    exports.urllist = results;
    console.log(results);
    //module.exports = urllist;

  });

connection.end();

