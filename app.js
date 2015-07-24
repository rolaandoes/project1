var silent = true;

var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var mongoose = require('mongoose');
var session = require('express-session');
var User = require('./models/user');
var Article = require('./models/article');
var app = express();
// var root = __dirname + '/public/';

mongoose.connect(
  // console.log(mongoose + "is up and ready")
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/project1'
);

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

//----------------------
//USER SETUP
//----------------------
//SET SESSION OPTIONS
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60000 }
}));
//MIDDLEWARE TO MANAGE SESSIONS
app.use('/', function (req, res, next) {
  // saves userId in session for logged-in user
  req.login = function (user) {
    req.session.userId = user.id;
  };

  // finds user currently logged in based on `session.userId`
   req.currentUser = function (callback) {
    User.findOne({_id: req.session.userId}, function (err, user) {
      req.user = user;
      callback(null, user);
    });
  };

  // destroy `session.userId` to log out user
    req.logout = function () {
    req.session.userId = null;
    req.user = null;
  };

  next();
});

// STATIC ROUTES
//homepage
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

//USER PROFILE PAGE
app.get('/profile', function (req, res) {
  // check for current (logged-in) user
  req.currentUser(function (err, user) {
  //   // show profile if logged-in user
  //   if (user) {
  //     res.sendFile(__dirname + '/public/views/profile.html');
  //   // redirect if no user logged in
  //   } else {
  //     res.redirect('/');
  //   }
  });
});
//AUTH ROUTES
// create new user with secure password
app.post('/users', function (req, res) {
console.log(req.body, "body");
  var newUser = req.body;
    User.createSecure(newUser, function (err, user) {
    // log in user immediately when created
    req.login(user);
    res.redirect('/profile');
   });
});

// authenticate user and set session
app.post('/login', function (req, res) {
  var userData = req.body.user;
  User.authenticate(userData.email, userData.password, function (err, user) {
    req.login(user);
    res.redirect('/profile');
  });
});

// log out user (destroy session)
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});
// Open server on specified port
// if (!silent) console.log("Starting Express server");
app.listen(process.env.PORT || 3000, function() {
  console.log('server started!')
});

//API ROUTES 
//show current user
app.get('/api/users/current', function (req, res) {
  // check for current (logged-in) user
  req.currentUser(function (err, user) {
    res.json(user);
  });
});

// create new log for current user
app.post('/api/users/current/articles', function (req, res) {
  // create new log with form data (`req.body`)
  var newArticle = new Article({
    title: req.body.title,
    URL: req.body.URL
  });
console.log(newArticle);
  // save new log
  newArticle.save();

  // find current user
  req.currentUser(function (err, user) {
    console.log("user", user);
    // embed new log in user's logs
    user.articles.push(newArticle); 
    // save user (and new log)
    user.save();
    console.log("user.save", user);
    // respond with new log
    res.json(newArticle);
  });
});

// show all articles
app.get('/api/articles', function (req, res) {
  Article.find(function (err, articles) {
    res.json(articles);
  });
});
//We don't need below because my users are only going to be able to favorite articles
// create new article
// app.post('/api/logs', function (req, res) {
//   // create new article with form data (`req.body`)
//   var newLog = new article({
//     type: req.body.type,
//     calories: req.body.calories
//   });

//   // save new log
//   newLog.save(function (err, savedLog) {
//     res.json(savedLog);
//   });
// });



// Capture uncaught errors
// process.on("uncaughtException", function(err) {
//   console.log(err);
// });