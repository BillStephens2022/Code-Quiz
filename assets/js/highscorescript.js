/* retrieving items from local storage and sorting them in descending order.
high scores are then displayed on highscore.html page */

var highScoreList = document.getElementById("high-score-list");
var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
var sortedHighScores = storedHighScores.sort(( a, b ) => b.score - a.score);

var liElement = document.createElement("li");
highScoreList.appendChild(liElement);

for (var i = 0; i < sortedHighScores.length; i++) {   
    var liElement = document.createElement("li");
    highScoreList.appendChild(liElement);
    liElement.textContent = sortedHighScores[i].userInitials + " " + sortedHighScores[i].score;
    liElement.classList.add("scores-list");
};
