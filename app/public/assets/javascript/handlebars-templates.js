// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "Handlebars-templates is ready" );

$.getJSON( "/api/getUrls", function( data ) {
  console.log(data);

  //BUILD TABLE
var source = $("#table-template").html(); 
var template = Handlebars.compile(source); 

var dataset = data;

$('.urltable').append(template(dataset)); 

console.log("TESTING --- site name is: " + dataset.urllist[0].URL);


//urls-table ENGINE - --------------------------------------------
function compiletable() {
  // Grab the template script
  var urlstable = $("#urls-table").html();

  // Compile the template
  var tablecompiled = Handlebars.compile(urlstable);

  // Define our data object
  var context={
    "urls": {
      "URLid": "URLid here",
      "URL": "URL here",
      "statusCode": "status here",
      "ScreenshotPath": "path here",
      "Action": "BUTTON"
    },
  };

  // Pass our data to the template
  var tabledata = tablecompiled(context);

  // Add the compiled html to the page
  $('.content-placeholder1').html(tabledata);

  };



//Show the SITENAME variable - --------------------------------------------

  // Grab the template script
  var sitename = $("#sitename").html();

  // Compile the template
  var sitenamecompiled = Handlebars.compile(sitename);

  // Define our data object
  var context={
    "sitename": dataset.urllist[0].URL
    };

  // Pass our data to the template
  var sitenamedata = sitenamecompiled(context);

  // Add the compiled html to the page
  $('.currentname').html("<h2>Current sitemap: " + sitenamedata + "</h2><br/>");



//END the GET function
});



//End doc ready function
});

