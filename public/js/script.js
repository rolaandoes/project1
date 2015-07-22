$(function(){
  //grabbing subreddits to stream
  var subreddit = ("http://www.reddit.com/r/news/new.json"); 
  // var compiled = function (){
  //http://stackoverflow.com/questions/8191105/how-to-extract-url-data-from-reddit-api-using-json
  //appending data from json objects
  $.getJSON(subreddit,function(data) {
      // console.log(data.data.children[1].data.title);
      $.each(data.data.children, function(i, item){
        // console.log(data.data.children[i]);
        // console.log(data.data.children[i].data.title);
        var postTitle = data.data.children[i].data.title;
        var postInfo = "info"
        var url = data.data.children[i].data.url;
        var $htmlTemplate = $(template({title:postTitle, link:url, info:postInfo, _id:"0"}))
        // console.log($htmlTemplate)
         // $("kind").attr("data", item.data.title).append("#titles")
       $("#titles").append($htmlTemplate);
       $("#link").append(url);
       // var $postHtml = $(compiled.template(post));
       // $('#titles').append($postHtml);
      });
    });

  // } 
var template = _.template($("#titles-template").html());
// $('')



});

