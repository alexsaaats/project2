//var tableData = require("../data/tableData");
//var waitListData = require("../data/waitinglistData");
var sitemapper = require("../../createsitemap");

// ===============================================================================
// ROUTING
// ===============================================================================

// API GET Requests
// ---------------------------------------------------------------------------

module.exports = function(app) {

  app.get("/api/createsitemap", function(req, res) {
    //res.json(tableData);
    console.log("You have hit the /api/createsitemap endpiont. PLEASE TRY AGAIN. ")
  });

  app.get("/api/getscreenshots", function(req, res) {
    //res.json(waitListData);
    console.log("You have hit the /api/getscreenshots endpiont. PLEASE TRY AGAIN. ")
  });

  app.get("/api/checkstatus", function(req, res) {
    res.json(waitListData);
    console.log("You have hit the /api/checkstatus endpoint. PLEASE TRY AGAIN. ")
  });


  // API POST Requests
  // ---------------------------------------------------------------------------

  app.post("/api/createsitemap", function(req, res) {
    // Run the createsitemap file and send send a success response.
    console.log("SERVER SAYS: I just got a new site. Going to create the sitemap and parse it into the DB.");
    console.log("THE SITE IS: " + req.body.siteurl );
    console.log("-------------------------------------------------------------------" );
    sitemapper.bigfunction(req.body.siteurl);


    //Send a response
    res.json(false);
  });

};
