BrainBuster Quiz
Overview
BrainBuster Quiz is a desktop application built with Electron that allows users to take quizzes on various topics. Users can select their desired category and the number of questions to answer, making it a flexible and fun way to test knowledge.

Key Features
Dynamic Category Selection: Enter a custom category/topic.
Custom Question Count: Select how many questions you want to answer (3, 5, 10).
Interactive Quiz Interface: Answer multiple-choice questions and get instant feedback on your performance.
Score Tracking: Keep track of your score throughout the quiz and view your final results.

Screenshots
Example of the quiz interface
![Screenshot 2024-10-16 221139](https://github.com/user-attachments/assets/75c179e6-54c4-4195-878f-1beaaa35aa1d)
![Screenshot 2024-10-16 221114](https://github.com/user-attachments/assets/3e0b9201-a077-49ba-a5e7-01314624e7b8)
![Screenshot 2024-10-16 221010](https://github.com/user-attachments/assets/325a7769-9789-4eb2-a195-9fbb273407b5)

Requirements
Node.js: Ensure you have Node.js installed on your machine.
Electron: The application is built using Electron, which allows for cross-platform desktop applications.
Installation

Clone the repository:
git clone https://github.com/isurunvn/brainbuster-quiz-app.git
cd brainbuster-quiz

Install dependencies:
npm install

Create a .env file in the root directory of the project and add your Google Gemini API key (api key should assign to 'API_KEY'):
Ex:
API_KEY=your_google_gemini_api_key


Build the application:

npm run build
Locate the packaged application in the dist/ folder.

Usage
Launch the application by double-clicking the executable file located in the dist/ folder.
Select a category and the number of questions you wish to answer.
Start the quiz and answer the questions.
Review your score at the end of the quiz.

Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

Acknowledgements
Inspired by various quiz applications and utilizing the Google Generative AI API for question generation.

Contact
For any questions or feedback, feel free to reach out to me at isurunaveen27@gmail.com.

