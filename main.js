const { BrowserWindow, app, ipcMain, dialog, shell } = require('electron');
const pkg = require('./package.json');
const fs = require('fs');
const path = require('path');
const url = require("url")

let win = null;
let downloadObj = {};

const resetDownloadObj = () => {
  downloadObj = {
    downloadPath: '',
    fileName: '',
    savedPath: ''
  }
}

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be'
    },
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: __dirname + '/preload.js'
    }
  })
  // win.loadFile('./build/index.html')
  if (pkg.isDev) {
    win.loadURL('http://localhost:3000')
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, './index.html'), // 修改
      protocol: 'file:',
      slashes: true
    }));
  }
  win.webContents.openDevTools();

  

  ipcMain.on('download-file', (event, arg) => {
    downloadObj.downloadPath = path.resolve(arg.downloadPath);
    downloadObj.fileName = arg.fileName;
    let ext = path.extname(downloadObj.fileName);
    let filters = [{ name: 'all files', extensions: '*' }];
    if (!fs.existsSync(downloadObj.downloadPath)) {
      console.log('文件不存在')
    }
    if (ext && ext !== '.') {
      filters.unshift({
        name: '',
        extensions: [ext.match(/[a-zA-Z]+$/)[0]]
      })
    }
    dialog.showSaveDialog(win, {
      filters,
      defaultPath: downloadObj.fileName
    }).then((result) => {
      downloadObj.savePath = result.filePath;
      if (downloadObj.savePath) {
        console.log(win.webContents);
        win.webContents.downloadURL(downloadObj.downloadPath);
      }
    }).catch(() => { })
  })

  win.webContents.session.on('will-download', (event, item) => {
    console.log(downloadObj)
    item.setSavePath(downloadObj.savePath);
    item.on('updated', (e, state) => {
      if (state === 'interrupted') {
        win.webContents.send('download-result', {
          type: 'interrupted'
        })
        console.log('Download is interrupted but can be resumed');
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          win.webContents.send('download-result', {
            type: 'pause'
          })
          console.log('Download is paused');
        } else {
          win.webContents.send('download-result', {
            type: 'update',
            data: {
              total: item.getTotalBytes(),
              up: item.getReceivedBytes()
            }
          })
          console.log(`Received bytes: ${item.getReceivedBytes()}`)
        }
      }
    })
    item.once('done', (e, state) => {
      if (state === 'completed') {
        console.log('Download successfully');
        shell.showItemInFolder(downloadObj.savePath);
        win.webContents.send('download-result', {
          type: 'done'
        })
      } else {
        win.webContents.send('download-result', {
          type: 'failed'
        })
        console.log(`Download failed: ${state}`);
      }
      resetDownloadObj()
    })

  })

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

ipcMain.on('do-a-thing', (event, arg) => {
  const outDir = './output/';
  const { data, projectName } = arg;
  let result = [];
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }
      var output = `${outDir}${projectName}.${key}.json`;
      fs.writeFileSync(output, JSON.stringify(element));
      result.push(output);
    }
  }
  event.sender.send('result-app', result);
})
