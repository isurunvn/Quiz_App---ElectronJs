const { contextBridge, ipcRenderer } = require('electron');

// Expose methods to securely communicate with the main process
contextBridge.exposeInMainWorld('electronAPI', {
  getApiKey: (callback) => ipcRenderer.on('apiKey', (event, apiKey) => callback(apiKey))
});
