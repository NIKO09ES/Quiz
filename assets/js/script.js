// Array questions
var questions = [
    {
        question: "Commonly used data types DO Not include:",
        choices: ["1.string", "2.booleans", "3.alerts", "4.numbers"],
        answer: "3.alerts"
    },
    {
        question: "Arrays in JavaScript can be used to store __________.",
        choices: ["1.numbers and strings", "2.other arrays", "3.booleans", "4.all of the above"],
        answer: "1.numbers and strings"
    },
    {
        question: "The condition in an if / else statement is enclosed with __________.",
        choices: ["1.quotes", "2.curly brackets", "3.parenthesis", "4.square brackets"],
        answer: "3.parenthesis"
    },
    {
        question: "Avery useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1.JavaScript", "2.terminal/bash", "3.for loops", "4.console.log"],
        answer: "4.console.log"
    }
]
var btnEl1 = document.createElement('button');
var btnEl2 = document.createElement('button');
var btnEl3 = document.createElement('button');
var btnEl4 = document.createElement('button');
var titleEl = document.getElementById("question-title");
// titleEl.textContent = currentQuestion.question;

// variables for timer
var body = document.body;
var timerEl = document.getElementById("countdown");
var count = 0;
// varibles for button
var startEl = document.getElementById("quiz");
var highEl = document.getElementById("high");

//Start the game with score 0.
var score = 0;
var timeLeft = 75;
var index = 0;
//Start- I look some refence in github for this functions in https://wendyhub.github.io/code-quiz/#
var endGame = function () {
    // clearInterval(timeInterval);

    var result = `
    <h2>End Game</h2>
    <h3>Your score is ` + score + `</h3>
    <input type="text" id="name" placeholder="Initials"> 
    <button onclick="setScore()">Save</button>`;

    document.getElementById("block").innerHTML = result;
    btnEl1.remove();
    btnEl2.remove();
    btnEl3.remove();
    btnEl4.remove();
}

function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById('name').value);
    getScore();
}


function getScore() {
    var scoreName = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="location.reload();">Play Again</button>
    
    `;

    document.getElementById("block").innerHTML = scoreName;
}
//End- I look some refence in github for this functions in https://wendyhub.github.io/code-quiz/#

function getQuestion() {
    var currentQuestion = questions[index];

    var title = document.getElementById('question-title')
    title.textContent = currentQuestion.question

    choices.innerHTML = ''

    currentQuestion.choices.forEach(function (choice, i) {
        var choiceBut = document.createElement('button');
        choiceBut.setAttribute('class', 'choice');
        choiceBut.setAttribute('value', choice)

        choiceBut.textContent = choice;

        choiceBut.onclick = questionClick;

        choices.appendChild(choiceBut);
    })
}

function questionClick() {
    console.log(questions[index].answer, this.value);
    if (this.value !== questions[index].answer) {
        timeLeft -= 15;
        score -= 25;
        console.log(score)
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        timerEl.textContent = timeLeft;

    }else{
        score += 25
        console.log(score)
    }
    index++

    if (index === questions.length) {
        endGame()
    }
    else {
        getQuestion()
    }
}

var time = function () {

    var timeInterval = setInterval(function () {
        timerEl.textContent = "Time: " + timeLeft;
        timeLeft--;

        if (timeLeft === 0) {
            timerEl.textContent = "Time: 0";
            endGame();
            clearInterval(timeInterval);
        }

    }, 1000);
    document.getElementById("quiz").remove();
    document.getElementById("paragraph").remove();
    getQuestion();
};


startEl.addEventListener("click", time);