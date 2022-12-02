// declaration of variables to capture various HTML elements.

var questionEl = document.getElementById("question");
var optionsEl = document.getElementById("options")
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-button");
var commentEl = document.getElementById("comment");
var initialsEl = document.getElementById("input-initials");

// declaration of variables needed for game play.

var timeLeft = 30;
var questionsIndex = 0;
var score = 0;
var gameOver;
var userInitials = "";
var highScores = [];


// variables for audio objects which will be played when user answers
// correctly (wooHoo!) and incorrectly (doh!)

var doh = new Audio ("./assets/sounds/doh.mp3");
var wooHoo = new Audio ("./assets/sounds/woohoo.mp3");

startButton.addEventListener("click", function(){
    init();
    //startButton.disabled = true;
    countdown();
    playGame();
});

function playGame() {
    nextQuestion();
    optionsEl.addEventListener("click", checkAnswer);
}


function countdown() {
    
    var timeInterval = setInterval(function() {
        if ((timeLeft > 1) && (gameOver === true)) {
            clearInterval(timeInterval);
            timerEl.textContent = "Game Over!";
            
            gameOver=false;
            startButton.disabled = false;
        } 
        else if (timeLeft > 1) {
            timerEl.textContent = "Time Remaining: " + timeLeft;
            timeLeft--;
        } else {
            timerEl.textContent = "Time Up!";
            startButton.disabled = false;
            clearInterval(timeInterval);
        }
    }, 1000)
}

function nextQuestion(){
    for (var i = 0; i < 4; i++) {
        questionEl.classList.add("question-slide");
        questionEl.textContent = "Question: " + questions[questionsIndex].question;
        var answerButton = document.createElement("button");
        answerButton.classList.add("answer-button");
        optionsEl.appendChild(answerButton);
        answerButton.innerHTML = questions[questionsIndex].options[i];
    };
}

function clearQuestion() {
    
    var child = optionsEl.lastElementChild;
    while (child) {
        optionsEl.removeChild(child);
        child = optionsEl.lastElementChild;
    };
    
}

function init() {
    startButton.disabled = true;
    gameOver = false;
    timeLeft = 30;
    questionEl.textContent = "";
    commentEl.textContent = "";
    questionsIndex = 0;
    score = 0;
    var child = optionsEl.lastElementChild;
    while (child) {
        optionsEl.removeChild(child);
        child = optionsEl.lastElementChild;
    };
    
}

function checkAnswer(event) {
    var element = event.target;
    
    if (element.textContent === questions[questionsIndex].answer) {
        commentEl.textContent = "Correct!";
        wooHoo.play();
        score++;
        answerSelected = true;
    } else {
        commentEl.textContent = "Incorrect!";
        doh.play();
        timeLeft-=5;
        answerSelected = true;
    };
    questionsIndex++;

    if ((questionsIndex < questions.length) && (timeLeft > 0)) {
        clearQuestion();
        playGame();
    } else {
        gameOver = true;
        commentEl.textContent = "Final Score: " + score + " out of " + questions.length;
        questionEl.textContent = "";
        clearQuestion();
        var labelElement = document.createElement("label");
        labelElement.textContent = "Add your initials to the High Score List!  ";
        initialsEl.appendChild(labelElement);
        var inputElement = document.createElement("input");
        inputElement.classList.add("input-element");
        inputElement.type = "text";
        inputElement.player = "player";
        inputElement.placeholder = "your initials";
        inputElement.value = userInitials;
        initialsEl.appendChild(inputElement);
        var submitButton = document.createElement("button");
        submitButton.innerHTML = "Submit";
        initialsEl.appendChild(submitButton);
        submitButton.classList.add("submit-button");
        submitButton.addEventListener("click", function() {
            userInitials = document.querySelector(".input-element").value;
            var newScore = {userInitials: userInitials, score: score};
        
            highScores.push(newScore);
            localStorage.setItem("highScores", JSON.stringify(highScores));
            labelElement.remove();
            userInitials = "";
            inputElement.remove();
            submitButton.remove();
        });

     
       
        
       
    };
    
}


