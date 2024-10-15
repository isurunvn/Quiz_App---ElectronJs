const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();


function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Handle API key retrieval in the main process
ipcMain.handle('apiKey', async () => {
  return process.env.API_KEY;  // Replace with your actual API key
});

// Handle question generation request in the main process
ipcMain.handle('generate-questions', async (event, category) => {
  try {
    const apiKey = process.env.API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    // Prepare the prompt for generating questions based on the category
    const prompt = `Generate 5 quiz questions in the category of ${category}. Include multiple choice answers.`;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    return result.response.text();  // Send back the text response to the renderer
  } catch (error) {
    console.error("Error generating questions:", error);
    return null;  // Send null in case of an error
  }
});
