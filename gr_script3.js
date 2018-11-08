"use strict";

/*
	Author: Daniel Isaman
	Date:   November 7, 2018

	Filename: gr_script3.js

================
Global Variables
================
   
press
	The clickable button to start/reset the program
title
	The main page header
sub
	The subtitle
button
	The message describing the button's action
ball
	The image of the ball
indyRun
	The animated image of Indiana Jones running
indyStay
	The still image of Indiana Jones
indyWhip
	The animation of Indiana Jones with the whip
ballPos
	Stores the horizontal location of the rolling ball
indyPos
	Stores the horizontal location of the Indy
i
	Stores the vertical location of the ball (to fall down the gorge)
timerRef
	Stores the interval timer thingamabob (This was the bane of my existence)


=============
Function List
=============

reset()
	Resets the program to pre-race
race()
	Begins the race
score()
	The repeating series of events that occur in intervals
ballMove()
	Sets the motion of the ball
indyMove()
	Sets Indiana Jones' movement using random speed
indyWin()
	Indiana Jones Wins
indyLose()
	Indian Jones Loses
*/


window.onload = reset;


var press = document.getElementById("press");
var title = document.getElementById("title");
var sub = document.getElementById("sub");
var button = document.getElementById("button");
var ball = document.getElementById("rock");
var indyRun = document.getElementById("running");
var indyStay = document.getElementById("still");
var indyWhip = document.getElementById("whip");
var ballPos = -15;
var indyPos = 0;
var i = 44;
var timerRef;

press.style.cursor = "pointer";



function reset() {
	clearInterval(timerRef);
	ballPos = -15;
	indyPos = 0;
	i = 44;

	ball.style.visibility = "visible";
	indyStay.style.visibility = "visible";

	indyStay.style.transform = "rotateZ(0deg)"
	indyStay.style.top= "37%";
	indyStay.style.left= "0%";

	ball.style.left = "-15%";
	ball.style.top = "44%";

	indyRun.style.left = "0%";
	indyWhip.style.visibility = "hidden";
	
	press.setAttribute("src", "dynamitePre.png");
	title.innerHTML = "Indiana Jones' Great Race";
	sub.innerHTML = "(Does that make it the Indy 500?)";
	button.innerHTML = "Press the button to start -->";

	press.onclick = race;
}



function race() {
	press.setAttribute("src", "dynamitePost.png");
	button.innerHTML = "Press the button to restart -->";

	document.getElementById("boom").setAttribute("src","explosion.gif");
	document.getElementById("boom").style.visibility = "visible";
	setTimeout("document.getElementById('boom').style.visibility = 'hidden'", 1700);
	
	indyRun.style.visibility = "visible";
	indyStay.style.visibility = "hidden";
	
	clearInterval(timerRef);
	timerRef = setInterval("score()", 100);
	press.onclick = reset;
}
	
function score() {
	if (ballPos >= indyPos) {
		ballMove();
		indyLose();
	}
	else if (indyPos > 72) {
		ballMove();
		indyWin();
	}
	else{
		ballMove();
		indyMove();
	}
	stop;
}

function ballMove() {
	if (ballPos < 80) {
		ballPos += (1.5 * Math.random());
		ball.style.left = ballPos + "%";
	}
	else  {
		if (i < 90) {
			i += 1.75;
			document.getElementById("rock").style.top = i + "%";
		}
		else {
			ball.style.visibility = "hidden";
		}
	}
}

function indyMove() {
	if (indyPos < 72) {
		indyPos += (1.3 * Math.random());
		indyRun.style.left = indyPos + "%";
		indyStay.style.left = indyPos + "%";
	}
	else {
		indyRun.style.visibility = "hidden";
	}
}

function indyWin() {
	indyRun.style.visibility = "hidden";
	indyPos = "96%";
	indyWhip.setAttribute("src", "indySaved.gif");
	indyWhip.style.visibility = "visible";
	clearTimeout();
	setTimeout('title.innerHTML = "INDIANA JONES WINS"', 3500);
	setTimeout('sub.innerHTML = "Our hero lives to see another day!"', 3500);
}

function indyLose() {
	indyRun.style.visibility = "hidden";
	indyStay.style.visibility = "visible";
	indyStay.style.transform = "rotateZ(90deg)";
	indyStay.style.top = "56%";
	indyStay.style.left = (indyPos-2.5) + "%";
	title.innerHTML = "INDIANA JONES LOSES";
	sub.innerHTML = "... HIS LIFE!";
}