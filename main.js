const { app, BrowserWindow, ipcMain } = require('electron');
const { algorithmsMeta } = require('./src/scripts/algorithmsMeta');
const path = require('path');

ipcMain.handle('get-algorithms-meta', () => {
    return algorithmsMeta;
});


function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    maxWidth: 2560,
    maxHeight: 1440,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'assets/logo/logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    } 
  });
 
  
  win.loadFile('./src/views/index.html');
}

app.whenReady().then(() => {
  createWindow();

  // macOS: recreate a window when the dock icon is clicked and there are no other windows open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});