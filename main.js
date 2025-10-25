
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");

function createWindow() {

  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    // autoHideMenuBar: true,
    icon: path.join(__dirname, "src", "assets", "img", "logo.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  win.maximize();
  win.loadFile('index.html')

}

app.whenReady().then(createWindow)
