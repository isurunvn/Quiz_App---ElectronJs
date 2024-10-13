// Function to fetch questions from the backend
async function fetchQuestions(category) {
  try {
    const response = await window.electronAPI.generateQuestions(category);
    const questions = parseQuestions(response);
    console.log(questions);  // Log for debugging
    return questions;  // Return the parsed questions
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];  // Return an empty array in case of error
  }
}

// Function to parse the generated content into a usable format
function parseQuestions(text) {
  const questions = [];
  const lines = text.split("\n").filter(line => line.trim() !== ""); // Split into lines based on new lines
  
  let currentQuestion = null;
  let answers = [];

  lines.forEach(line => {
    // Remove Markdown-like formatting (** and ##)
    const cleanedLine = line.replace(/[*#]/g, "").trim();

    // Check if the cleaned line is a question (starts with a number and a period)
    const questionMatch = cleanedLine.match(/^\d+\.\s*(.*)/);
    if (questionMatch) {
      if (currentQuestion && answers.length > 0) {
        // If there's a current question, save it before starting a new one
        questions.push({
          question: currentQuestion,
          answers: answers.map(answer => ({ text: answer.trim(), correct: false }))
        });
      }
      currentQuestion = questionMatch[1].trim(); // Extract the question text
      answers = []; // Reset answers for the new question
    } else {
      // Otherwise, treat it as an answer
      const answerMatch = cleanedLine.match(/^[a-d]\)\s*(.*)/);
      if (answerMatch) {
        answers.push(answerMatch[1].trim()); // Extract the answer text
      } else if (cleanedLine.startsWith("##") || cleanedLine === "") {
        // Skip headings or empty lines
        console.log("Skipping heading or empty line:", cleanedLine);
      } else {
        console.error("Malformed question or answers:", cleanedLine); // Debug any malformed lines
      }
    }
  });

  // Add the last question after the loop
  if (currentQuestion && answers.length > 0) {
    questions.push({
      question: currentQuestion,
      answers: answers.map(answer => ({ text: answer.trim(), correct: false }))
    });
  }

  // Randomly mark one answer as correct for each question
  questions.forEach(q => {
    if (q.answers.length > 0) {
      const correctIndex = Math.floor(Math.random() * q.answers.length);
      q.answers[correctIndex].correct = true; // Set one answer as correct
    }
  });

  return questions;
}

// Function to start the quiz
function startQuiz(questions) {
  const quizContainer = document.getElementById('question-container');
  quizContainer.innerHTML = ''; // Clear previous quiz content

  questions.forEach((q, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');

    const questionText = document.createElement('h3');
    questionText.innerText = `Q${index + 1}: ${q.question}`;
    questionElement.appendChild(questionText);

    const answersContainer = document.createElement('div');
    answersContainer.classList.add('answers-container');

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
  resultContainer.innerHTML = ''; // Clear previous results

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
  
  // Fetch questions dynamically from the API
  const quizQuestions = await fetchQuestions(category);
  
  if (quizQuestions.length > 0) {
    startQuiz(quizQuestions);  // Function to handle the quiz logic
  } else {
    alert("No questions were generated. Please try again.");
  }
});
