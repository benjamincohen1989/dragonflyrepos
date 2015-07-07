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
  var usernames = ["tgoldenberg", "alcsatt", "benjamin.cohen1989", "tekd", "JMC11", "sevennote", "julia-castro", "lowellmower", "mcardacci", "michaelbbozza", "grapefruittricky", "shmartin", "sixthand6th"];
  var githubUrl = "https://api.github.com/users/";
  $('.btn-lg').on('click', function(e) {
    e.preventDefault();
    usernames.forEach(function(element, idx) {
      var username = element;

      $.ajax({
        url: githubUrl + element + "/repos?sort=created?access_token=e700c6f603d1ac7881c31d703e315e22bb044ddc",
        method: "get",
        dataType: "json",
        data: {usernames: usernames}
      }).done(function(data) {
        var element = '<h4>'+ username + '</h4><hr/>';
        data.forEach(function(repo, idx) {
          if (idx < 3) {
            element += '<p><a href="' + repo["html_url"] + '">' + repo["name"] + " || " + repo["created_at"] + "</a></p>";
          }
        });
        $('.display-panel').append(element);

      }).fail(function(error) {
        console.log(error)
      });
    });
  })
});


