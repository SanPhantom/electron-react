// window.electron = require('electron');
// window.ipcRenderer = require('electron').ipcRenderer;
// window.remote = require('electron').remote; 

// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    doThing: (data, callback) => {
      ipcRenderer.send('do-a-thing', data);
      ipcRenderer.on('result-app', function(event, arg) {
        callback(arg);
      })
    },
    downloadFile: (downloadPath, fileName, callback) => {
      ipcRenderer.send('download-file', {downloadPath, fileName});
      ipcRenderer.on('download-result', (event, data) => {
        callback(data);
      })
    }
  }
)