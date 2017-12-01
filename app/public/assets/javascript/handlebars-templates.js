// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "Handlebars-templates is ready" );


//FIRST TEMPLATE ENGINE - --------------------------------------------

  // Grab the template script
  var theTemplateScript1 = $("#address-template").html();

  // Compile the template
  var theTemplate1 = Handlebars.compile(theTemplateScript1);

  // Define our data object
  var context={
    "city": "London",
    "street": "Baker Street",
    "number": "221B"
  };

  // Pass our data to the template
  var theCompiledHtml = theTemplate1(context);

  // Add the compiled html to the page
  $('.content-placeholder1').html(theCompiledHtml);



//SECOND TEMPLATE ENGINE - --------------------------------------------
// Grab the template script
  var theTemplateScript2 = $("#expressions-template").html();

  // Compile the template
  var theTemplate2 = Handlebars.compile(theTemplateScript2);

  // Define our data object
  var context={
    "description": {
      "escaped": "Using {{}} brackets will result in escaped HTML:",
      "unescaped": "Using {{{}}} will leave the context as it is:"
    },
    "example": "<button> Hello </button>"
  };

  // Pass our data to the template
  var theCompiledHtml = theTemplate2(context);

  // Add the compiled html to the page
  $('.content-placeholder2').html(theCompiledHtml);




//End doc ready function
});

