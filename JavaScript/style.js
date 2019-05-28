$(document).ready(function(){
	/*
	if ($(window).height() <= $("video").height()) {
		$(Element).hover(function(){
	  	  Change ... when hover enters
	  	}, function(){
	  		Change ... when hover exits
		});
	}*/

  $(window).scroll(function() {
    navBarBehaviour()
    backToTopBtn()
    activeSection()
  });

  function navBarBehaviour() {
    if($(window).scrollTop() > $("video").height()-144){
      $(".container").css({"background-color":"rgba(239, 239, 239, 1)"});
      $("nav a").css({"color":"black"});
      $(".logo a").css({"color":"black"});
      $(".container").css({"box-shadow":"0px -6px 7px 7px black"});
    }
    else {
      $(".container").css({"background-color":"rgba(239, 239, 239, 0)"});
      $("nav a").css({"color":"white"});
      $(".logo a").css({"color":"white"});
      $(".container").css({"box-shadow":"0px 0px 0px 0px rgba(0, 0, 0, 0)"});
    }
  }

  function backToTopBtn() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("myBtn").style.visibility = "visible";
      document.getElementById("myBtn").style.opacity = "0.6";
    } else {
      document.getElementById("myBtn").style.visibility = "hidden";
      document.getElementById("myBtn").style.opacity = "0";
    }
  }
})

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}