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


/* variables for audio objects which will be played when user answers
correctly (wooHoo!) and incorrectly (doh!) */

var doh = new Audio ("./assets/sounds/doh.mp3");
var wooHoo = new Audio ("./assets/sounds/woohoo.mp3");

/* provides functionality for "start" button - 
initializes game, starts countdown and game play */

startButton.addEventListener("click", function(){
    init();
    //startButton.disabled = true;
    countdown();
    playGame();
});

// function to start game and checks answer once user clicks on an answer.

function playGame() {
    nextQuestion();
    optionsEl.addEventListener("click", checkAnswer);
}

// function for countdown and shows "Time Up!" when timer hits zero. also re-enables start button

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


// function to show the next question and multiple choice answer options.

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

// function to clear the existing question and answers from the screen (i.e. once user selects answer.)

function clearQuestion() {
    
    var child = optionsEl.lastElementChild;
    while (child) {
        optionsEl.removeChild(child);
        child = optionsEl.lastElementChild;
    };
    
}

/* initializes a new game. restarts timer, resets score to zero and 
removes last question and answer options from screen. */

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

/* checks to to see if user selected correct answer. If answer correct,
increments score by 1, plays "wooHoo!"" soundclip.  If answer incorrect, decrements
timer by 10 seconds and plays "doh!" soundclip.  Also increments the questions index by
1 so that next question can be selected in the array.  Also checks if game is over and initiates
game over sequence. */

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
        timeLeft-=10;
        answerSelected = true;
    };
    questionsIndex++;

    if ((questionsIndex < questions.length) && (timeLeft > 0)) {
        clearQuestion();
        playGame();
    } else {
        gameOverSequence();
    }; 
}

/* function for game over.  Shows final score, clears questions/answers from screen,
and asks user to input initials to add to the high scores list.  Initials and scores
are saved into local storage and rendered on the highscores.html page. */

function gameOverSequence() {
    gameOver = true;
        commentEl.textContent = "Final Score: " + score + " out of " + questions.length;
        questionEl.textContent = "";
        clearQuestion();
        var labelElement = document.createElement("label");
        labelElement.textContent = "Enter your initials for the High Scores List:";
        initialsEl.appendChild(labelElement);
        var inputElement = document.createElement("input");
        inputElement.classList.add("input-element");
        inputElement.type = "text";
        inputElement.player = "player";
        inputElement.placeholder = "initials";
        inputElement.maxLength = "2";
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
}
