const { contextBridge, ipcRenderer } = require('electron');

// Expose methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  getApiKey: () => ipcRenderer.invoke('apiKey'),
  generateQuestions: (category, count) => ipcRenderer.invoke('generate-questions', category, count)  // Add count parameter
});
