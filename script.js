// Questions and answers to quiz
const question = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Test Manuscript Language", correct: false },
      { text: "Home Testing Markup List", correct: false },
      { text: "Home Timer Manuscript Language", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Casecade Style Sheet", correct: true },
      { text: "Center Style System", correct: false },
      { text: "Center Style System", correct: false },
      { text: "Center Style System", correct: false },
    ],
  },
  {
    question: "What is X?  (5*10) + 20 = x",
    answers: [
      { text: "x = 40", correct: false },
      { text: "x = 110", correct: false },
      { text: "x = 70", correct: true },
      { text: "x = 150", correct: false },
    ],
  },
  {
    question:
      "What is the output?   let x = 0;  while (x<6) { x++; } console.log(x)",
    answers: [
      { text: "0", correct: false },
      { text: "5", correct: true },
      { text: "4", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "How do you add single line comments on a Javascipt file?",
    answers: [
      { text: "/* text */", correct: false },
      { text: "<!--  text -- >", correct: false },
      { text: "// text", correct: true },
      { text: "# text", correct: false },
    ],
  },
  {
    question: "What is Bootstrap?",
    answers: [
      { text: "A strap that is on a boot", correct: false },
      { text: "The functions of CSS", correct: false },
      { text: "A CSS Framework", correct: true },
      { text: "A file that is inserted into the CSS file", correct: false },
    ],
  },
  {
    question: "What does DOM stand for?",
    answers: [
      { text: "Document Object Manuscript", correct: false },
      { text: "Document Object Model", correct: true },
      { text: "Document Obstruct Model", correct: false },
      { text: "Desktop Object Menu", correct: false },
    ],
  },
  {
    question: "What year did Michael Scott leave The Office?",
    answers: [
      { text: "2020", correct: false },
      { text: "2012", correct: false },
      { text: "2010", correct: false },
      { text: "2011", correct: true },
    ],
  },
];

let questionNames = question.map((el) => el.answers);
let b = questionNames[1]


//Quiz questions are linked to
const questionElement = document.getElementById("questions");
//Where answer options are placed
const answerButtonElement = document.getElementById("answer-buttons");
//Start button linked to
const startButton = document.getElementById("start-btn");
//Next button is linked to
const nextButton = document.getElementById("next-btn");
//Submit button is linked to
const submitButton = document.getElementById("submit-btn");
//Start screen where questions and answers are contained
const questionContainerElement = document.getElementById("questions-container");
//Intial display prompt
const displayInstructions = document.getElementById("displayInstructions");

//Start button link to HTML
$(startButton).on("click", startGame);

//Next button link to; along with function
$(nextButton).on("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

let shuffledQuestions, currentQuestionIndex;

//Start Button Intiate
function startGame() {
  // Adds Start button, along with CSS properties
  $(startButton).addClass("hide btn-primary btn mt-4");
  //Randomize question order
  shuffledQuestions = question.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;

  //Hide start button and display instructions once clicked
  questionContainerElement.classList.remove("hide");
  $(displayInstructions).addClass("hide");
  setNextQuestion();
}
//Shuffles Questions through the currentQuestionsIndex
function setNextQuestion() {
  resetState();
  showQuestions(shuffledQuestions[currentQuestionIndex]);
}
function showQuestions(question) {
  // Grabs questions from "Questions" constant and display them onto HTML through questionsElement
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    //
    let button = document.createElement("button");
    button.innerText = answer.text;
    $(button).addClass("btn-primary btn mt-3");
    //
    if (answer.correct) {
      button.dataset.correct = answer.correct;
     
    }
    // button.addEventListener("click", selectAnswer); removable
    $(button).on("click", selectAnswer);
    answerButtonElement.appendChild(button);
  });
}

function resetState() {
  $(nextButton).addClass("hide");
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
}
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
    nextButton.classList.remove("hide");
    $(nextButton).addClass("btn-primary btn mt-4");
    //Need to change
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("hide");
    } else {
      // startButton.innerText = "Submit"; //Needs to a submit
      submitButton.classList.remove("hide");
      $(nextButton).addClass("hide");
    }
  });
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    // element.classList.add("correct");
    console.log("correct")
  } else {
    element.classList.add("wrong");
    console.log("wrong")
  }
}
function clearStatusClass(element) {
  element.classList.remove("corect");
  element.classList.remove("wrong");
}

const lose = document.getElementById("losecard");
function timer() {
  //Starting time
  let intitalTime = 60;
  //
  let movingTimer = setInterval(function () {
    // If timer stops at 0, text will pop up.
    if (intitalTime < 0) {
      clearInterval(movingTimer);
      // document.getElementById("timer").textContent = "Count reached 0. You failed!"
    } else {
      document.getElementById("timer").textContent = intitalTime + "s";
    }
    //Increment by -1
    intitalTime -= 1;
  }, 1000);
}
// Initiate timer once start button has been clicked
startButton.addEventListener("click", timer);
/* 
Start timer countdown once start button is clicked
Stop timer once submit is clicked
Answer is right, timer stays the same
Answer is wrong, deduct 15 seconds from timer
*/

