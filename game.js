'use strict';

var buttonColours = ["red", "blue", "green", "yellow"]; //color tarray
var gamePattern = [] ,userClickedPattern = []; 
var started = false; //check if game is started
var level = 0; //calculate the current level

$(document).keypress(function() { //first keypress
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() { //when the user select a button

  var userChosenColour = $(this).attr("id"); // selected id
  userClickedPattern.push(userChosenColour); //addind the color at the end of array

  playSound(userChosenColour); 
  animatePress(userChosenColour); 
  checkAnswer(userClickedPattern.length-1); 
});

//function that calculates if the the selected buttons are the same
function checkAnswer(currentLevel) { //

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over"); //changing the appearance 
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver(); // Call startOver() if the user gets the sequence wrong.
    }

}
//Function that calculates the next selected random colour
function nextSequence() { 

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animation for clicked buttons
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//when the user lose,starting again the game 
function startOver() {

  level = 0;
  gamePattern = [];
  started = false;
}

$("button.btnquit").click(function () {
  startOver();
  $("h1").text("You quit.Press any key to start again!");
  $("h1").fadeOut(60).fadeIn();

  
})