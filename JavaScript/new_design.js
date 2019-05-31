window.onload = firstLn;

// NavBar: click to change active state
$(document).ready(function(){
  	$('ul li a').click(function(){
    	$('li a').removeClass("active");
    	$(this).addClass("active");
	});
});

var i = 0;
var j = 0;
var line_1 = ' Hi, my name is Alan. ';
var line_2 = ' I am a Programmer.';
var speed = 80;

var i2 = 0;
var j2 = 0;

var pause = 900; 

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

function test() {
	document.getElementById("learn-more").style.visibility = "visible";
	document.getElementById("learn-more").style.color = "white";
}

