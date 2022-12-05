'use strict';
const {
  app,
  BrowserWindow,
  ipcMain,
} = require('electron');
// reload  application   while   coding
require('electron-reload')(__dirname);
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

/**
 * Creat Window
 */
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    height: 600,
    minHeight: 500,
    minWidth: 500,
    width: 900,
    icon: 'assets/images/logo/logo-icon.png',
    show: false,
    /* , frame: false*/
  });
  // and load the index.html of the app.
  win.loadFile('html/login.html');
  // Open the DevTools.
win.webContents.openDevTools();

  win.setMenu(null);
  win.once('ready-to-show', () => {
    win.show();
  });
}
/**
 * Open System Page
 */
ipcMain.on('systemPage', () => {
  win.loadFile('html/index.html');
});

/**
 * Open login Page
 */
ipcMain.on('loginPage', () => {
  win.loadFile('html/login.html');
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
