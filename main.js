const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('dotenv').config(); // Load environment variables

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Use preload.js
      nodeIntegration: false, // Disable direct Node.js integration for security
      contextIsolation: true,  // Isolate renderer context
    }
  });

  win.loadFile('index.html');

  // Send API key to renderer when window is loaded
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('apiKey', process.env.GEMINI_API_KEY);
  });
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
