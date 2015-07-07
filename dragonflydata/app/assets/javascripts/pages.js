// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {

  $('.check').on('click', function() {
    var that = this;
    for(i=0;i<3;i++) {
      $('.check')[i].checked = false;
      this.checked = true;

    }

  });

  // navigation to respond to screen resizing
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

  var page = 1;

  // AJAX call to get most recent repositories of DBC students
  var NYC_POCKET_GOPHERS = ["aceburgess", "AlexTaber", "aperezmontan", "HanuMaIV", "Doralyp", "echenique11", "ScottBWar", "fishermanng", "sidwatal", "TTrinkle"];
  var NYC_BUMBLEBEES = [];
  var NYC_FIERY_SKIPPERS = ["manentea", "NIkocal", "benlights", "laurisbernhart", "Dholness2", "sbelkin88"];
  var NYC_DRAGONFLIES = ["tgoldenberg", "alcsatt", "benjamincohen1989", "tekd", "JMC11", "sevennote", "julia-castro", "lowellmower", "mcardacci", "michaelbbozza", "grapefruitricky", "shmartin", "sixthand6th", "johnlyden"];
  var githubUrl = "https://api.github.com/users/";
  $('.btn-lg').on('click', function(e) {
    e.preventDefault();
    var cohort = $('.summary').html();
    var AJAXCohort = NYC_DRAGONFLIES;
    switch(cohort) {
      case "NYC Fiery Skippers":
        AJAXCohort = NYC_FIERY_SKIPPERS;
      break;
      case "NYC Dragonflies":
        AJAXCohort = NYC_DRAGONFLIES;
        break;
      case "NYC Pocket Gophers":
        AJAXCohort = NYC_POCKET_GOPHERS;
      break;
      default:
        AJAXCohort = NYC_DRAGONFLIES;
      break;
    }
    console.log(cohort);
    $('.user-profile').remove();
    AJAXCohort.forEach(function(element, idx) {
      var username = element;
      var index = idx + 1;

      $.ajax({
        url: githubUrl + username + "/repos?sort=created&access_token=a99ebfa9324ccb18ed08527715e659e3d8e339f8",
        method: "get",
        dataType: "json"
      }).done(function(data) {
        var element = '<div class="user-profile"><div class="user-avatar"><img src="' + data[0]["owner"]["avatar_url"] + '"/></div><div class="user-info"><hr/><h4>'+ username + '</h4>';
        data.forEach(function(repo, idx) {
          if (idx < 3) {
            element += '<p><a href="' + repo["html_url"] + '">' + repo["name"] + "</a> || created on: " + new Date(repo["created_at"]).toLocaleDateString() + "</p>";
          }
        });
        element += "</div></div>";
        $('.display-panel').append(element);

      }).fail(function(error) {
        console.log(error)
      });
    });
  })
});


