import { GoogleGenerativeAI } from "@google/generative-ai";

let apiKey;
let genAI;

// Wait for the API key from the main process
window.electronAPI.getApiKey((key) => {
  apiKey = key;
  initGoogleGenerativeAI();
});

// Initialize Google Generative AI once the API key is received
function initGoogleGenerativeAI() {
  if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
}

// Function to fetch questions from the Gemini API based on the selected category
async function fetchQuestionsFromGemini(category) {
  if (!genAI) {
    console.error("Google Generative AI is not initialized");
    return null;
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Generate a quiz with 10 questions about ${category}.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text(); // Assuming text is returned
  } catch (error) {
    console.error("Error fetching questions:", error);
    return null;
  }
}

// Parse the quiz questions
function parseQuestions(responseText) {
  if (!responseText) {
    alert("Failed to fetch questions. Please try again.");
    return [];
  }

  try {
    const questionsArray = JSON.parse(responseText); // Assuming JSON structure
    return questionsArray.map((question) => ({
      question: question.text,
      answers: question.options.map(option => ({
        text: option.text,
        correct: option.isCorrect
      })),
    }));
  } catch (error) {
    console.error("Error parsing questions:", error);
    return [];
  }
}

// Event listener for the 'Start Quiz' button
document.getElementById('start-btn').addEventListener('click', async () => {
  const category = document.getElementById('category-select').value;
  console.log("Category selected:", category);

  // Fetch and parse the quiz questions
  const quizQuestions = await fetchQuestionsFromGemini(category);
  const questions = parseQuestions(quizQuestions);

  if (questions.length > 0) {
    startQuiz(questions); // Start the quiz with the questions
  }
});

// Start the quiz
function startQuiz(questions) {
  let currentQuestionIndex = 0;
  let score = 0;

  // Quiz logic to display questions, handle answers, and calculate score
  displayQuestion(questions[currentQuestionIndex]);

  document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion(questions[currentQuestionIndex]);
    } else {
      showResults(score, questions.length);
    }
  });

  // Restart quiz logic
  document.getElementById('restart-btn').addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    startQuiz(questions);
  });
}

// Display the current question and its answers
function displayQuestion(question) {
  const questionContainer = document.getElementById('question-container');
  questionContainer.innerText = question.question;

  const answerButtons = document.getElementById('answer-buttons');
  answerButtons.innerHTML = ''; // Clear previous answers

  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.innerText = answer.text;
    button.addEventListener('click', () => {
      if (answer.correct) {
        score++;
      }
      document.getElementById('next-btn').classList.remove('hidden');
    });
    answerButtons.appendChild(button);
  });
}

// Show final results
function showResults(score, totalQuestions) {
  const questionContainer = document.getElementById('question-container');
  questionContainer.innerHTML = `Quiz complete! You scored ${score} out of ${totalQuestions}.`;
  document.getElementById('next-btn').classList.add('hidden');
  document.getElementById('restart-btn').classList.remove('hidden');
}
