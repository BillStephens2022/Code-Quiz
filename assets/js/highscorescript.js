
var highScoreList = document.getElementById("high-score-list");
var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
console.log(storedHighScores);
var sortedHighScores = storedHighScores.sort((a, b) => a.value - b.value);
console.log(sortedHighScores);



var liElement = document.createElement("li");
highScoreList.appendChild(liElement);


for (var i = 0; i < sortedHighScores.length; i++) {
    console.log(sortedHighScores[i].userInitials + " " + sortedHighScores[i].score);
    var liElement = document.createElement("li");
    highScoreList.appendChild(liElement);
    liElement.textContent = sortedHighScores[i].userInitials + " " + sortedHighScores[i].score;
    liElement.classList.add("scores-list");

    
};
