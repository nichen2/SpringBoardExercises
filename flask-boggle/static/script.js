let timerInterval;
$(document).ready(function () {
  timerInterval = setInterval(updateTimer, 1000); // Call updateTimer every 1000ms (1 second)
});
let score = 0;
let timeLeft = 60;
$("#guess-button").on("click", function (e) {
  e.preventDefault();
  postGuess();
  $("#guess-input").val("");
});

async function postGuess() {
  const guess = $("#guess-input").val().toLowerCase();
  console.log("Sending:", guess);
  let response = await axios.post("/guess", { guess: guess });
  const result = response.data.result;
  if (result === "ok") {
    score += guess.length;
  }
  $("#guess-result").text("Result: " + result);
  $("#game-score").text("Score: " + score);
}

async function sendScore() {
  let response = await axios.post("/update-score", { score: score });
  console.log(response.data);
}

function updateTimer() {
  if (timeLeft <= 0) {
    $("#game-timer").html("0");
    clearInterval(timerInterval);
    $("#guess-input").prop("disabled", true);
    $("#guess-button").prop("disabled", true);
    sendScore();
    setTimeout(function () {
      alert("Time's up!");
    }, 10);
  } else {
    $("#game-timer").html(timeLeft);
    timeLeft -= 1;
  }
}
