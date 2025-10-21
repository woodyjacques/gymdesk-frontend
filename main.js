const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");

let registerModal = null;
let loginModal = null;

function createWindow() {
  
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "src", "assets", "img", "logo.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  win.loadFile('index.html')

  ipcMain.on('open-register-modal', () => {
    if (loginModal && !loginModal.isDestroyed()) {
      loginModal.close();
    }
    if (registerModal && !registerModal.isDestroyed()) {
      registerModal.focus();
      return;
    }
    registerModal = new BrowserWindow({
      parent: win,
      modal: true,
      show: true,
      width: 800,
      height: 600,
      autoHideMenuBar: true,
      icon: path.join(__dirname, "src", "assets", "img", "logo.png"),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    });
    registerModal.loadFile('src/html/register.html');
    registerModal.on('closed', () => { registerModal = null; });
  });

  ipcMain.on('open-login-modal', () => {
    if (registerModal && !registerModal.isDestroyed()) {
      registerModal.close();
    }
    if (loginModal && !loginModal.isDestroyed()) {
      loginModal.focus();
      return;
    }
    loginModal = new BrowserWindow({
      parent: win,
      modal: true,
      show: true,
      width: 800,
      height: 600,
      autoHideMenuBar: true,
      icon: path.join(__dirname, "src", "assets", "img", "logo.png"),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    });
    loginModal.loadFile('index.html');
    loginModal.on('closed', () => { loginModal = null; });
  });
}

app.whenReady().then(createWindow)
