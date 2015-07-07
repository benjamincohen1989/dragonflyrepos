// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {
  var menuToggle = $('#js-mobile-menu').unbind();
  $('#js-navigation-menu').removeClass("show");

  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-navigation-menu').slideToggle(function(){
      if($('#js-navigation-menu').is(':hidden')) {
        $('#js-navigation-menu').removeAttr('style');
      }
    });
  });
  var totalRepos = [];
  var usernames = ["tgoldenberg"];
  var githubUrl = "https://api.github.com/";
  usernames.forEach(function(element, idx) {
    $.ajax({
      url: githubUrl + element + "/repos?access_token=" + ENV["github_token"],
      method: "get",
      dataType: "json",
      data: {usernames: usernames}
    }).done(function(data) {
      $('.display-panel').append('<p><a href="' + data["url"] + '">' + data["name"] + "</a></p>");
    }).fail(function(error) {
      console.log(error)
    });
  });

});


