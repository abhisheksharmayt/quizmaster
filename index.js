import quizData from './quiz.json' assert{type: "json"}

const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const restartButton = document.getElementById('reset');
const first = document.getElementById('first');
const second = document.getElementById('second');
const third = document.getElementById('third');
const fourth = document.getElementById('fourth');
const progress = document.getElementById('progress');
const question = document.getElementById('question');
const form = document.querySelector('form');

let submit = false;
let currentQuestion = 0;
let score = 0;

window.onload = () => {
    optionMap.clear();
    showNextQuestion();
    setAttemptedAnswer();
    restartButton.style.display = "none";
}

nextButton.addEventListener("click", () => {
    console.log('next is clicked')
    if (currentQuestion < 10) {
        submitAnswer(true);
        showNextQuestion();
        setAttemptedAnswer();
    }
    else {
        calculateScore();

    }
})
prevButton.addEventListener("click", () => {
    console.log('prev is clicked');
    if (currentQuestion > 1) {
        submitAnswer(true);
        showPrevQuestion();
        setAttemptedAnswer();
    }
})

restartButton.addEventListener("click", () => {
    reStart();
})

const showNextQuestion = () => {
    currentQuestion++;
    question.innerText = quizData[currentQuestion - 1].question;
    first.innerText = quizData[currentQuestion - 1].options[0];
    second.innerText = quizData[currentQuestion - 1].options[1];
    third.innerText = quizData[currentQuestion - 1].options[2];
    fourth.innerText = quizData[currentQuestion - 1].options[3];
    progress.innerText = `${quizData[currentQuestion - 1].index + 1}/10`;
    console.log(currentQuestion);
}

const showPrevQuestion = () => {
    currentQuestion--;
    question.innerText = quizData[currentQuestion - 1].question;
    first.innerText = quizData[currentQuestion - 1].options[0];
    second.innerText = quizData[currentQuestion - 1].options[1];
    third.innerText = quizData[currentQuestion - 1].options[2];
    fourth.innerText = quizData[currentQuestion - 1].options[3];
    progress.innerText = `${quizData[currentQuestion - 1].index + 1}/10`;
    console.log(currentQuestion);
}


let optionMap = new Map();

const submitAnswer = (forward) => {
    const optionsArr = document.querySelectorAll('input');
    for (let i = 1; i <= 4; i++) {
        // console.log(optionsArr[i-1])
        if (optionsArr[i - 1].checked) {
            optionMap.set(currentQuestion, i);
            console.log(optionMap);
        }
    }
}

const setAttemptedAnswer = () => {
    const optionsArr = document.querySelectorAll('input');
    for (let i = 1; i <= 4; i++) {
        if (optionMap.has(currentQuestion) && optionMap.get(currentQuestion) == i) {
            optionsArr[i - 1].checked = true;
        }
        else {
            optionsArr[i - 1].checked = false;
        }
    }
}

const calculateScore = () => {
    const progressDiv = document.getElementById('progress-div');
    progressDiv.style.display = "none";
    nextButton.style.display = "none";
    prevButton.style.display = "none";
    for (let keyPair of optionMap) {
        console.log(keyPair)
        if (quizData[keyPair[0] - 1].answer == keyPair[1])
            score++;
    }
    console.log(`Score is ${score}`);
    showScore();
}

const showScore = () => {
    const scoreBoard = document.getElementById('scoreBoard');
    scoreBoard.style.display = 'block';
    scoreBoard.innerText = `Total Score : ${score}/10`
    form.style.display = "none";
    question.innerText = "Congratulations!!! You have complete the assignment";
    restartButton.style.display = "initial";
}

const reStart = () => {
    restartButton.style.display = "none";
    score = 0;
    const progressDiv = document.getElementById('progress-div');
    progressDiv.style.display = "flex";
    nextButton.style.display = "initial";
    prevButton.style.display = "initial";
    form.style.display = "initial";
    currentQuestion = 0;
    scoreBoard.style.display = 'none';
    optionMap.clear();
    showNextQuestion();
    setAttemptedAnswer();
}