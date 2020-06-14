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
// variables for timer
var body = document.body;
var timerEl = document.getElementById("countdown");
var count = 0;
// varibles for button
var startEl = document.getElementById("quiz");
var highEl = document.getElementById("high");

//Start the game with score 0.
var score = 0;
// var correct = function() {
//     score += 20;
//     index++;
//     start();
// }

// var incorrect = function() {
//     score -= 15;
//     index++;
//     start();
// }
var index = 0;

//Start- I look some refence in github for this functions in https://wendyhub.github.io/code-quiz/#
var endGame = function () {
    // clearInterval(timeInterval);

    var result = `
    <h2>End Game</h2>
    <h3>Your score is ` + score +`</h3>
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
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
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

var start = function() {
    
    var h2El = document.getElementById('title')
    
    h2El.textContent = questions[index].question;
    btnEl1.textContent = questions[index].choices[0];
    btnEl2.textContent = questions[index].choices[1];
    btnEl3.textContent = questions[index].choices[2];
    btnEl4.textContent = questions[index].choices[3];
    body.appendChild(btnEl1);
    body.appendChild(btnEl2);
    body.appendChild(btnEl3);
    body.appendChild(btnEl4);
    
    
    var next = function(e) {
        console.log(e);
        var answer = e.target.textContent;
        console.log(answer, questions[index].answer)
        if(answer == questions[index].answer) {
            score += 20;
            console.log(score);
        } else {
            score -= 15;
            console.log(score)
        }
        if(index < questions.length -1) {
            index++;
            start() 
        } else {
            endGame()
        } 
    }
    btnEl1.addEventListener("click", next)
    btnEl2.addEventListener("click", next)
    btnEl3.addEventListener("click", next)
    btnEl4.addEventListener("click", next)
   
}

var time = function() {
    var timeLeft = 75;

    var timeInterval = setInterval(function () {
        timerEl.textContent = "Time: " + timeLeft ;
        timeLeft--;
    
        if (timeLeft === 0) {
          timerEl.textContent = "Time: 0";
          endGame();
          clearInterval(timeInterval);
        }
    
    }, 1000);
    document.getElementById("quiz").remove();
    document.getElementById("paragraph").remove();
    start();
};


startEl.addEventListener("click", time);