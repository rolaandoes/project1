//dependancies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10),
    Article = require('./article');

//USER SCHEMA 
var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  avatar: String,
  email: String,
  passwordDigest: String,
  Article:[Article.schema]
});
//CREATE USER WITH HASHED PW

UserSchema.statics.createSecure = function (userData, callback) {
  // `this` references our schema
  // store it in variable `that` because `this` changes context in nested callbacks
  var that = this;

  // hash password user enters at sign up
  bcrypt.genSalt(function (err, salt) {
  	console.log("userData", userData);
    bcrypt.hash(userData.passwordDigest, salt, function (err, hash) {
      console.log(hash);

      // create the new user (save to db) with hashed password
      that.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatar: userData.avatar,
        email: userData.email,
        passwordDigest: hash
      }, callback);
    });
  });
};
//AUTHENTICATE LOGIN
UserSchema.statics.authenticate = function (email, password, callback) {
  // find user by email entered at log in
  this.findOne({email: email}, function (err, user) {
    console.log(user);

    // throw error if can't find user
    if (user === null) {
      throw new Error('Can\'t find user with email ' + email);

    // if found user, check if password is correct
    } else if (user.checkPassword(password)) {
      callback(null, user);
    }
  });
};//COMPARE PASSWORD TO THE HASHED PW 'PASSWORDDIGEST'
UserSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password user enters in order to compare with `passwordDigest`
  return bcrypt.compareSync(password, this.passwordDigest);
};
//DEFINE USER MODEL
// create and export User model
var User = mongoose.model('User', UserSchema);
module.exports = User;
