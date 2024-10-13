// Function to fetch questions from the main process
async function fetchQuestions(category) {
  try {
    const questionsText = await window.electronAPI.generateQuestions(category);

    if (questionsText) {
      const questions = parseQuestions(questionsText);
      return questions;
    } else {
      throw new Error("Failed to generate questions");
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

// Function to parse the generated content into a usable format
function parseQuestions(text) {
  const questions = [];
  const questionBlocks = text.split("\n").filter(block => block.trim() !== "");

  questionBlocks.forEach(block => {
    const [question, ...answers] = block.split(";");
    questions.push({
      question: question.trim(),
      answers: answers.map(answer => ({ text: answer.trim(), correct: false }))  // Set correct property later
    });
  });

  questions.forEach(q => {
    const correctIndex = Math.floor(Math.random() * q.answers.length);
    q.answers[correctIndex].correct = true;  // Randomly set one answer as correct
  });

  return questions;
}

// Function to start the quiz
function startQuiz(questions) {
  const quizContainer = document.getElementById('question-container');
  quizContainer.innerHTML = '';  // Clear previous quiz content

  questions.forEach((q, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');

    const questionText = document.createElement('h3');
    questionText.innerText = `Q${index + 1}: ${q.question}`;
    questionElement.appendChild(questionText);

    const answersContainer = document.createElement('div');
    q.answers.forEach(answer => {
      const answerLabel = document.createElement('label');
      const answerInput = document.createElement('input');
      answerInput.type = 'radio';
      answerInput.name = `question-${index}`;
      answerInput.value = answer.text;
      answerLabel.appendChild(answerInput);
      answerLabel.appendChild(document.createTextNode(answer.text));
      answersContainer.appendChild(answerLabel);
    });
    questionElement.appendChild(answersContainer);
    quizContainer.appendChild(questionElement);
  });

  const submitButton = document.createElement('button');
  submitButton.innerText = 'Submit Answers';
  submitButton.addEventListener('click', () => checkAnswers(questions));
  quizContainer.appendChild(submitButton);
}

// Function to check answers
function checkAnswers(questions) {
  const results = [];
  questions.forEach((q, index) => {
    const selectedAnswer = document.querySelector(`input[name="question-${index}"]:checked`);
    if (selectedAnswer) {
      const isCorrect = q.answers.find(answer => answer.text === selectedAnswer.value).correct;
      results.push({
        question: q.question,
        selected: selectedAnswer.value,
        correct: isCorrect
      });
    }
  });

  displayResults(results);
}

// Function to display results
function displayResults(results) {
  const resultContainer = document.getElementById('result-container');
  resultContainer.innerHTML = '';  // Clear previous results

  results.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.classList.add('result');
    resultElement.innerText = `Question: ${result.question} - Your answer: ${result.selected} - ${result.correct ? 'Correct' : 'Incorrect'}`;
    resultContainer.appendChild(resultElement);
  });
}

// Start the quiz when the button is clicked
document.getElementById('start-btn').addEventListener('click', async () => {
  const category = document.getElementById('category-select').value;

  // Fetch questions dynamically from the main process
  const quizQuestions = await fetchQuestions(category);

  if (quizQuestions.length > 0) {
    startQuiz(quizQuestions);  // Function to handle the quiz logic
  } else {
    alert("No questions were generated. Please try again.");
  }
});
