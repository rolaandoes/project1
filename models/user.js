//dependancies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	salt = bcrypt.genSaltSync(10);

//USER SCHEMA 
var UserSchema = new Schema({
	email: String,
	passwordDigest: String
});

//CREATE USER WITH HASHED PW

UserSchema.statics.createSEcure = function (email, passowrd, callback) {
	//'THIS' REFERENCES SCHEMA
	//'THIS' CHANGES CALLBACK SO WE ARE STORING IT IN 'THAT'
	var that = this;
	
}