const { contextBridge, ipcRenderer } = require('electron');

// Expose methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  getApiKey: () => ipcRenderer.invoke('apiKey'),
  generateQuestions: (category) => ipcRenderer.invoke('generate-questions', category)  // Expose the generateQuestions function
});
