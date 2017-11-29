// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

//Start server listening
app.listen(PORT, () => console.log('Saaats Mini app listening on port ' + PORT));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//ROUTES =============================================================
//Basic route that sends the user first to the AJAX Page
app.use('/static', express.static('app/public'));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/index.html"));
  console.log("homepage loaded");
});

app.get("/css", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/assets/semantic/semantic.min.css"));
  console.log("css loaded");
});

app.get("/cssjs", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/assets/semantic/semantic.min.js"));
  console.log("css JS loaded");
});

app.get("/menujs", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/assets/javascript/menu.js"));
  console.log("menu JS loaded");
});

app.get("/createsitemap", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/assets/javascript/createsitemap.js"));
  console.log("createsitemap.js loaded");
});