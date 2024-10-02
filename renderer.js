const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
        { text: "Paris", correct: true },
        { text: "Lisbon", correct: false }
      ]
    },
    {
      question: "Who is the founder of Microsoft?",
      answers: [
        { text: "Steve Jobs", correct: false },
        { text: "Bill Gates", correct: true },
        { text: "Mark Zuckerberg", correct: false },
        { text: "Elon Musk", correct: false }
      ]
    },
    {
      question: "What does HTML stand for?",
      answers: [
        { text: "HyperText Markup Language", correct: true },
        { text: "Hot Mail", correct: false },
        { text: "HyperText Makeup Language", correct: false },
        { text: "HyperText Markdown Language", correct: false }
      ]
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionContainer = document.getElementById('question-container');
  const answerButtons = document.getElementById('answer-buttons');
  const nextButton = document.getElementById('next-btn');
  const restartButton = document.getElementById('restart-btn');
  
  function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    nextButton.classList.add('hidden');
    restartButton.classList.add('hidden');
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerText = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectAnswer(button, answer.correct));
      answerButtons.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.classList.add('hidden');
    answerButtons.innerHTML = '';
  }
  
  function selectAnswer(selectedButton, isCorrect) {
    Array.from(answerButtons.children).forEach(button => {
      button.disabled = true;
      if (button === selectedButton) {
        if (isCorrect) {
          button.classList.add('correct');
        } else {
          button.classList.add('wrong');
        }
      }
    });
  
    nextButton.classList.remove('hidden');
    if (isCorrect) score++;
  }
  
  function showScore() {
    resetState();
    questionContainer.innerText = `You scored ${score} out of ${questions.length}!`;
    restartButton.classList.remove('hidden');
  }
  
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  });
  
  restartButton.addEventListener('click', startQuiz);
  
  startQuiz();
  