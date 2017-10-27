var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Requires and sets the HTML routes in this file
require('./routing/htmlRoutes.js')(app);

// Requires and sets the API routes in this file
require('./routing/apiRoutes.js')(app);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});