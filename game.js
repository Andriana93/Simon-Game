
var buttonColours = ["red","blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];


var started = false;
var level = 0;


$(document).keypress(function(){ //detects for keypress in entire web document
  if (!started){  //our started var is false, the (!) reverses that
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");//respond to click of btn and generates it's id (eg. colour of btn)
  userClickedPattern.push(userChosenColour);//adds clicked btn id to userClickedPattern array

  playSound(userChosenColour);//plays sound of clicked btn

  animatePress(userChosenColour);//animates user clicked btn

  checkAnswer(userClickedPattern.length - 1);
});




function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success!");


  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }


  } else {

    console.log("wrong!");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over. Press any key to restart!");

    startOver();
    }

}


function nextSequence(){

  userClickedPattern = [];
  level++; //increases level each time function is called
  $("#level-title").text("Level " + level); //updates level each time

  var randomNumber = Math.floor(Math.random() * 4); //generates random number 0-3 inclusive
  var randomChosenColour = buttonColours[randomNumber]; // targets btn colour in array
  gamePattern.push(randomChosenColour); //adds that randomly chosen colour to  gamePattern

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);//animates that random chosen btn
  playSound(randomChosenColour); //plays sound of random chosen btn
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}






function startOver(){

  level = 0;
  gamePattern = [];
  started = false;
}
