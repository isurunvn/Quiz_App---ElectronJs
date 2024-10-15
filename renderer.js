let currentQuestionIndex = 0;
let score = 0;
let quizQuestions = [];

// Function to fetch questions from the backend
async function fetchQuestions(category) {
  try {
    const response = await window.electronAPI.generateQuestions(category);
    const questions = parseQuestions(response);
    return questions;  // Return the parsed questions
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];  // Return an empty array in case of error
  }
}

// Function to parse the generated content into a usable format
function parseQuestions(text) {
  const questions = [];
  const lines = text.split("\n").filter(line => line.trim() !== "");

  let currentQuestion = null;
  let answers = [];

  lines.forEach(line => {
    const cleanedLine = line.replace(/[*#]/g, "").trim();
    const questionMatch = cleanedLine.match(/^\d+\.\s*(.*)/);
    
    if (questionMatch) {
      if (currentQuestion && answers.length > 0) {
        questions.push({
          question: currentQuestion,
          answers: answers.map(answer => ({ text: answer.trim(), correct: false }))
        });
      }
      currentQuestion = questionMatch[1].trim();
      answers = [];
    } else {
      const answerMatch = cleanedLine.match(/^[a-d]\)\s*(.*)/);
      if (answerMatch) {
        answers.push(answerMatch[1].trim());
      }
    }
  });

  if (currentQuestion && answers.length > 0) {
    questions.push({
      question: currentQuestion,
      answers: answers.map(answer => ({ text: answer.trim(), correct: false }))
    });
  }

  questions.forEach(q => {
    if (q.answers.length > 0) {
      const correctIndex = Math.floor(Math.random() * q.answers.length);
      q.answers[correctIndex].correct = true;
    }
  });

  return questions;
}

// Function to start the quiz
function startQuiz(questions) {
  quizQuestions = questions;
  currentQuestionIndex = 0;
  score = 0;

  document.getElementById('category-select').classList.add('hidden');
  document.getElementById('custom-category').classList.add('hidden');
  document.getElementById('start-btn').classList.add('hidden');
  document.getElementById('question-container').classList.remove('hidden');
  document.getElementById('next-btn').classList.remove('hidden');

  showQuestion();
}

// Function to show a question
function showQuestion() {
  const questionContainer = document.getElementById('question-container');
  const answerButtons = document.getElementById('answer-buttons');
  questionContainer.innerHTML = '';
  answerButtons.innerHTML = '';

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const questionText = document.createElement('h3');
  questionText.innerText = `Q${currentQuestionIndex + 1}: ${currentQuestion.question}`;
  questionContainer.appendChild(questionText);

  currentQuestion.answers.forEach((answer, index) => {
    const answerLabel = document.createElement('label');
    const answerInput = document.createElement('input');
    answerInput.type = 'radio';
    answerInput.name = 'answer';
    answerInput.value = answer.text;

    answerLabel.appendChild(answerInput);
    answerLabel.appendChild(document.createTextNode(answer.text));
    answerButtons.appendChild(answerLabel);

    answerInput.addEventListener('change', () => {
      if (answer.correct) score++;
    });
  });
}

// Function to handle the next question or show the results
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// Function to display the results
function showResults() {
  document.getElementById('question-container').classList.add('hidden');
  document.getElementById('answer-buttons').classList.add('hidden');
  document.getElementById('next-btn').classList.add('hidden');
  document.getElementById('restart-btn').classList.remove('hidden');
  document.getElementById('result-container').classList.remove('hidden');

  const resultContainer = document.getElementById('result-container');
  resultContainer.innerHTML = `Quiz completed! Your score: ${score} / ${quizQuestions.length}`;
}

// Start the quiz when the button is clicked
document.getElementById('start-btn').addEventListener('click', async () => {
  let category = document.getElementById('category-select').value;

  // Check if the user selected the custom category
  if (category === 'custom') {
    category = document.getElementById('custom-category').value.trim();
  }

  if (!category) {
    alert("Please enter a valid category.");
    return;
  }

  const quizQuestions = await fetchQuestions(category);
  if (quizQuestions.length > 0) {
    startQuiz(quizQuestions);
  } else {
    alert("No questions were generated. Please try again.");
  }
});

// Show custom category input when 'custom' is selected
document.getElementById('category-select').addEventListener('change', () => {
  const category = document.getElementById('category-select').value;
  const customCategoryInput = document.getElementById('custom-category');
  
  if (category === 'custom') {
    customCategoryInput.classList.remove('hidden');
  } else {
    customCategoryInput.classList.add('hidden');
  }
});

// Move to the next question when the "Next" button is clicked
document.getElementById('next-btn').addEventListener('click', nextQuestion);

// Restart the quiz when the "Restart" button is clicked
document.getElementById('restart-btn').addEventListener('click', () => {
  document.getElementById('restart-btn').classList.add('hidden');
  document.getElementById('result-container').classList.add('hidden');
  document.getElementById('category-select').classList.remove('hidden');
  document.getElementById('start-btn').classList.remove('hidden');
});
