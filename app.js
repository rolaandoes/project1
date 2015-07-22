var silent = true;

var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
// var mongoose = require('mongoose');
var session = require('express-session');
var User = ('./models/user');

var app = express();
// var root = __dirname + '/public/';



// --------------------------------------------------------------------
// SET UP EXPRESS
// --------------------------------------------------------------------

// Serve static files from directory
app.use(express.static(__dirname + '/public/'));

// Parse application/json and application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(bodyParser.json());
//SET SESSION OPTIONS
// app.use(session({
//   saveUninitialized:true,
//   resave: true,
//   secret: 'SuperSecretCookie',
//   cookie: {maxAge:6000}
// }));
// //MIDDLEWARE TO MANAGE SESSIONS
// app.use('/', function(req, res, next){
//   //saves userID for session
//   req.login = function (user){
//     req.session.userID = user.id;
//   };
// });
// //FINDS LOGGED IN USER BY 'SESSION.USERID'
// req.currentUser = function(callback) {
//   User.fincOne({_id: req.session.userid}, function(err, user){
//     req.user = user;
//     callback(null, user);
//   });
// };
//DESTROY 

// root route (serves index.html)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});


//--------------------------
//SET UP MONGOOSE
//--------------------------

// mongoose.connect(
//   process.env.MONGOLAB_URI ||
//   process.env.MONGOHQ_URL ||
//   'mongodb://localhost/project1' // plug in the db name you've been using
// );


// Open server on specified port
// if (!silent) console.log("Starting Express server");
app.listen(process.env.PORT || 3000, function() {
  console.log('server started!')
});


// Capture uncaught errors
// process.on("uncaughtException", function(err) {
//   console.log(err);
// });