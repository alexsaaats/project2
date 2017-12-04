//SET CONSTANTS AND VARIABLES
const request = require("request");

const mysql      = require('mysql');
/*const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Test101!',
  database : 'saaatsmini'
});*/

const Sequelize = require('sequelize');
/* const sequelize = new Sequelize('saaatsmini', 'root', 'Test101!', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
}); */

// Define sequelize model for the URLs
const siteCode = sequelize.define('siteurls', {
  URLid: Sequelize.INTEGER,
  URL: Sequelize.STRING,
  statusCode: Sequelize.STRING
})

var urllist = [];
var newlist = [];

//GET DB URL LIST ----------------------
connection.connect();
	 
	connection.query('SELECT URL FROM siteurls;', function (error, results, fields) {
	  if (error) throw error;
	  urllist = results;
	  var count = urllist.length;
	  console.log("COUNT: " + count);
	  loopArray(urllist);
	});




//CALL FUNCTIONS -------------------------------------------
//getstatus();


/*
//FUNCTION -- CHECK STATUS CODES ---------------------------------------
function getstatus() {

	connection.connect();
	 
	connection.query('SELECT URL FROM siteurls;', function (error, results, fields) {
	  if (error) throw error;
	  urllist = results;
	  var count = urllist.length;
	  console.log("COUNT: " + count);
	  //console.log("URL TEST: " + urllist[0].URL);
	  //console.log("ID TEST: " + urllist[0].id);

	  for (i=0; i < count; i++) {
	  	console.log('round: ' + i);
		request(urllist[i].URL, function (error, response, body) {
	  		//console.log('error:', error); // Print the error if one occurred
	  		console.log('Round ' + i + ' -- statusCode: ', response && response.statusCode); // Print the response status code if a response was received

	  		/*siteCode.update({statusCode: response.statusCode}, {fields: ['statusCode']}).then(() => {
	  			console.log("StatusCode updated in DB")
	  		})
	  		siteCode.update({statusCode: response.statusCode,}, {where: {id: i } });
        	
		});
	  }

	});
	 
	connection.end();

}
*/


//FUNCTION -- CHECK STATUS CODES -- NOLOOP ---------------------------------------

var x = 0;
function loopArray(arr) { 

    LogSaveStatusCode(arr[x],function(){
        // set x to next item
        x++;

        // any more items in array? continue loop
        if(x < arr.length) {
            loopArray(arr);   
        }    else {
            	connection.end();
            	console.log(newlist);
            }
        
    }); 
    
}

function LogSaveStatusCode (msg,callback) {
    //This code updates the list of URLs processed, and then calls for status on each url. Once complete, it moves to next item. 

    //console.log(msg);
    //console.log(msg.URL);
    newlist.push(msg.URL);
    var curcount = newlist.length

		request(msg.URL, function (error, response, body) {
	  		console.log('error:', error); // Print the error if one occurred
	  		console.log('Round ' + curcount + ' -- statusCode: ', response && response.statusCode); // Print the response status code if a response was received

	  		siteCode.update({statusCode: response.statusCode,}, {where: {id: curcount } });
        	
		}); 
	  

    // do callback when ready
    callback();
};

