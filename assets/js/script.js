// Questions array - an array of objects with the question, options, and correct answer.

var questions = [
    {
        question: "What is JavaScript?",
        options: 
            [
                "a) JavaScript is a scripting language used to make the website interactive", 
                "b) JavaScript is an assembly language used to make the website interactive",
                "c) JavaScript is a compiled language used to make the website interactive",
                "d) None of the Above"
            ],
        answer: "a) JavaScript is a scripting language used to make the website interactive"
    },
    {
        question: "Which of the following is correct about JavaScript?",
        options: 
            [
                "a) JavaScript is an Object-Based language", 
                "b) JavaScript is Assembly-language",
                "c) JavaScript is an Object-Oriented language",
                "d)  JavaScript is a High-level language"
            ],
        answer: "a) JavaScript is an Object-Based language"
    },
    {
        question: "Which of the following languages can be used to build a website?",
        options: 
            [
                "a) JavaScript", 
                "b) HTML",
                "c) CSS",
                "d) All of the Above"
            ],
        answer: "d) All of the Above"
    },
    {
        question: "What is the file called that contains much of the styling for a web page?",
        options: 
            [
                "a) colorcode", 
                "b) stylesheet",
                "c) designsheet",
                "d) stylefile"
            ],
        answer: "b) stylesheet"
    },
    {
        question: "Where should you ideally place the <script> tag in your HTML file to link to your external JavaScript file?",
        options: 
            [
                "a) anywhere within the <head> section", 
                "b) anywhere you want, as long as it's placed somewhere within the <html> tags",
                "c) at the bottom of the body element",
                "d) In the <head> section, below the link to your CSS stylesheet"
            ],
        answer: "c) at the bottom of the body element"
    },
];

var questionEl = document.getElementById("question");
var optionsEl = document.getElementById("options")
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-button");
var commentEl = document.getElementById("comment");

var timeLeft = 30;
var questionsIndex = 0;
var score = 0;
var gameOver;
var UserInitials;

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
        score++;
        answerSelected = true;
    } else {
        commentEl.textContent = "Incorrect!";
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
        userInitials = prompt("What are your initials?");
    };
    
}
