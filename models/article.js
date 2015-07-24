// require mongoose
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// define article schema
var ArticleSchema = new Schema({
  title: String,
  URL: String
});

// create and export Log model
var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;