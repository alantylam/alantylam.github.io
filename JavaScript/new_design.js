window.onload = setTimeout(trig, 1500);

$(document).ready(function(){
  	$('ul li a').click(function(){
    	$('li a').removeClass("active");
    	$(this).addClass("active");
	});

	$(window).scroll(function() {
		var Scroll = $(window).scrollTop();
		var half = $(window).height()/2;

		if (Scroll >= 0) {
		    $("#link-1").addClass("active");
		} else {
		    $("#link-1").removeClass("active");
		}
		if (Scroll >= half) {
		    $("#link-2").addClass("active");
			$("#link-1").removeClass("active"); 
		} else {
		    $("#link-2").removeClass("active");
		}
		if (Scroll >= (half*3)) {
		    $("#link-3").addClass("active");
			$("#link-2").removeClass("active"); 
		} else {
		    $("#link-3").removeClass("active");
		}
		if (Scroll >= (half*5)) {
		    $("#link-4").addClass("active");
			$("#link-3").removeClass("active");
			//$('.link').css('color', 'black');
		} else {
		    $("#link-4").removeClass("active");
		    //$('.link').css('color', 'white');
		}

	});
});

var i = 0;
var j = 0;
var line_1 = ' Hi, my name is Alan. ';
var line_2 = ' I am a Programmer.';
var speed = 80;

var i2 = 0;
var j2 = 0;

var pause = 700;

function trig() {
	document.getElementById("container").style.opacity = "1";
	document.getElementById("nav").style.opacity = "1";
	document.getElementById("contact").style.opacity = "1";
	setTimeout(firstLn, 700);
}

function firstLn() {
	if (i < line_1.length) {
		document.getElementById("message").innerHTML += line_1.charAt(i);
		i++;
		j = i;
		setTimeout(firstLn, speed);
	}
	if (j > 1 && i == line_1.length) {
		setTimeout(secLn, pause);
	}
}

function secLn() {
	if (j > 1 && i == line_1.length) {
		document.getElementById("message").innerHTML = document.getElementById("message").innerHTML.replace(/(\s+)?.$/, '');
		j--;
		setTimeout(secLn, speed+30);
	}
	if (j == 1 && i == line_1.length) {
		if (i2 < line_2.length) {
			document.getElementById("message").innerHTML += line_2.charAt(i2);
			i2++;
			j2 = i2;
			setTimeout(secLn, speed+140);
		}
	}
	if (i2 == line_2.length) {
		document.getElementById("learn-more").style.visibility = "visible";
		document.getElementById("learn-more").style.color = "white";
	}
}

function scrollToBottom() {
	window.scrollTo(0, document.body.scrollHeight);
}






