const { BrowserWindow, app } = require('electron');
const pkg = require('./package.json');

let win = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be'
    }
  })
  win.loadFile('./build/index.html')
  if (pkg.isDev) {
    win.loadURL('http://localhost:3001')
  } else {
    window.loadFile('./build/index.html');
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})
