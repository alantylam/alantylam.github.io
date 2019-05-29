var i = 0;
var j = 0;
var line_1 = ' Hello, World! ';
var line_2 = ' My name is Alan. ';
var speed = 150;

var i2 = 0;
var j2 = 0;

function typeWriter() {
	if (i < line_1.length) {
		document.getElementById("message").innerHTML += line_1.charAt(i);
		i++;
		j = i;
		setTimeout(typeWriter, speed);
	}
	if (j > 1 && i == line_1.length) {
		document.getElementById("message").innerHTML = document.getElementById("message").innerHTML.replace(/(\s+)?.$/, '');
		j--;
		setTimeout(typeWriter, speed+200);
	}
	if (j == 1 && i == line_1.length) {
		if (i2 < line_2.length) {
			document.getElementById("message").innerHTML += line_2.charAt(i2);
			i2++;
			j2 = i2;
			setTimeout(typeWriter, speed+400);
		}
	}
}