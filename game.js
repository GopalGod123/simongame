const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Start game on keypress
$(document).keypress(() => {
  if (!started) {
    resetGame();
    nextSequence();
    started = true;
  }
});

// Handle user clicks
$(".btn").click(function () {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  handleUserClick(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function handleUserClick(colour) {
  playSound(colour);
  animatePress(colour);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    gameOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text(`Level ${++level}`);

  const randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);

  animateSequence(randomChosenColour);
  playSound(randomChosenColour);
}

function animateSequence(colour) {
  $(`#${colour}`).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(colour) {
  $(`#${colour}`).addClass("pressed");
  setTimeout(() => $(`#${colour}`).removeClass("pressed"), 100);
}

function playSound(name) {
  new Audio(`sounds/${name}.mp3`).play();
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(() => $("body").removeClass("game-over"), 200);
  resetGame();
}

function resetGame() {
  level = 0;
  gamePattern = [];
  started = false;
}
