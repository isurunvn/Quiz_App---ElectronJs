const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
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

ipcMain.handle('apiKey', async () => {
  return process.env.API_KEY;  // Replace with your actual API key
});

// Handle question generation request with category and question count
ipcMain.handle('generate-questions', async (event, category, count) => {
  try {
    const apiKey = process.env.API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    // Prepare the prompt for generating the requested number of questions
    const prompt = `Generate ${count} quiz questions in the category of ${category}. Include multiple choice answers.`;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    return result.response.text();  // Send back the text response to the renderer
  } catch (error) {
    console.error("Error generating questions:", error);
    return null;  // Send null in case of an error
  }
});
