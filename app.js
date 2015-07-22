var silent = true;

var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var mongoose = require('mongoose');
var session = require('express-session')

var app = express();
var root = __dirname + '/public/';



// --------------------------------------------------------------------
// SET UP EXPRESS
// --------------------------------------------------------------------

// Parse application/json and application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(bodyParser.json());

// Simple logger
// app.use(function(req, res, next){
//   console.log("%s %s", req.method, req.url);
//   console.log(req.body);
//   next();
// });

// Error handler
// app.use(errorHandler({
//   dumpExceptions: true,
//   showStack: true
// }));

// Serve static files from directory
app.use(express.static(__dirname + '/public/'));

// root route (serves index.html)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});
//--------------------------
//SET UP MONGOOSE
//--------------------------

mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/YOUR_LOCAL_DATABASE_NAME' // plug in the db name you've been using
);

// Open server on specified port
// if (!silent) console.log("Starting Express server");
app.listen(process.env.PORT || 3000, function() {
  console.log('server started!')
});


// Capture uncaught errors
// process.on("uncaughtException", function(err) {
//   console.log(err);
// });