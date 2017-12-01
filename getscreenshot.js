//CONSTANTS
const request = require("request").defaults({ encoding: null });
const base64Img = require('base64-img');
const token ='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tpZCI6IjE1MTEzMjcxMDQyNjYtNDgiLCJlbWFpbCI6ImFsZXhAc2FhYXRzLmNvbSIsInNlcnZpY2UiOiJzY3JlZW4ucmlwIiwicGxhbiI6MTAwLCJpYXQiOjE1MTEzMjcxMDQsImV4cCI6MTU0Mjg2MzEwNH0.IBRr7T5TBPPGqWvVtLIWDBIdyoeXwDqODUvqtkmAQpVX0nSwbPp-Lj_CCFF0du7O6Fk_DzPjaRmDYoqV-nyp38s03KxwujXCiqr-Bg7oAfw1h0R39UF9l2r90p3pq-kBIjnszyQ-7dBCRGH8vJaLE7gEy8tuUyVrfSp16A0QX1stNqWlXYvgwso28ehtNvdPpbFT9KLMaRJMOP9OooA_KknHh3ZDe7q5bUWyC_l-EgtUbADEPc3Xlltj5MwkUGj-FzQJrm-0ZDZ6rSedYtbbCcryItDzn24vZS8k2VuXXpHbrbR7Ig1gD3PFAp-QKlf9JKSVCFaqXXYjqVEOgvqxGvUMwlILtbTxGpv0nZq0CFu7RkuIZ6eK_iZYdSErZ7DXUZi2NUtiOWbe5LDuP3mSzAqrlq3jwTA-8zsg6AGXrCrtXFNHD5VTaOQWZ59Kvb98aV2DEofxok0Pjz-GB35t1HfdzE-voDW18PH4vsGYDk9_P7TjIFfeiFawETIhh1zEcHUkliTFJGgJGPyTSWMrDTg1G-PzItrfvnyp2wrMSdjSYMakFG-MCDvIA8RXdp0upfE6WDHrFK2LUYRc3x1VyLQRIHSxRNsgS7jizNU5YxdTIdMpUPKI1e4-W-qrVwx27tpXTNAV5pYLq59L1lzAm556QYGcdWLs0AaLsKNHG_w'

const Sequelize = require('sequelize');
const sequelize = new Sequelize('saaatsmini', 'root', 'Test101!', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Test101!',
  database : 'saaatsmini'
});

// Define sequelize model for the URLs
const siteURL = sequelize.define('siteurl', {
  URLid: Sequelize.INTEGER,
  URL: Sequelize.STRING,
  screenshotPath: Sequelize.STRING
})



//VARIABLES
var urllist = [];
var pageurl = 'http://google.com';
var pathname = 'test';

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








//FUNCITON CALLS

//createUrlList();


//VIEW HEADER RESPONSE IF NEEDED --------------------------------------------
/* 
request
  .get('https://screen.rip/capture?token=' + token + '&url=' + pageurl)
  .on('response', function(response) {
    console.log(response.statusCode) // 200
    console.log(response.headers) 
  });
*/

/*
function seqget() {
	var urllist1 = 
	siteURL.findAll({
		attributes: ['url']
	});
	console.log(urllist1);
}
*/

//CREATE SCREENSHOTS FOR ALL URLs ---------------------------------------------------
/*function createUrlList() {

	connection.connect();
		 
	connection.query('SELECT URL, id FROM siteurls;', function (error, results, fields) {
	  if (error) throw error;
	  urllist = results;
	  var count = urllist.length;
	  console.log("COUNT: " + count);
	  //console.log("URL TEST: " + urllist[0].URL);
	  //console.log("ID TEST: " + urllist[0].id);
	  
	  for (i=0; i < count; i++) {
		var shoturl = urllist[i].URL;
		pathname = urllist[i].id;

		request.get('https://screen.rip/capture?token=' + token + '&url=' + shoturl, function (error, response, body) {
			if (!error && response.statusCode == 200) {
		    data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
		    //console.log(data);
			    base64Img.img(data, './app/public/screenshots', pathname, function(err, filepath) {
			    console.log('FILEPATH: ' + filepath)
			    });
			}
		});

		console.log("Screenshot added of " + shoturl);
	  } 

	});
	 
	connection.end();

};
*/



/*
//GET SCREENSHOT AND PUT IN FILE SYSTEM --------------------------------------
request.get('https://screen.rip/capture?token=' + token + '&url=' + pageurl, function (error, response, body) {
	if (!error && response.statusCode == 200) {
	    data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
	    //console.log(data);
	    base64Img.img(data, './app/public/screenshots', pathname, function(err, filepath) {
	    	console.log('FILEPATH: ' + filepath)
	    });
	}
});
*/

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
    var pathname = curcount

		request.get('https://screen.rip/capture?token=' + token + '&url=' + msg.URL, function (error, response, body) {
			if (!error && response.statusCode == 200) {
		    data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
		    //console.log(data);
			    base64Img.img(data, './app/public/screenshots', pathname, function(err, filepath) {
			    console.log('FILEPATH: ' + filepath)
			    siteURL.update({screenshotPath: filepath,}, {where: {id: curcount } });
			    });
			}
		});
	  

    // do callback when ready
    callback();
};

