const fs = require('fs');
const path = require('path');
const { app, BrowserWindow, session, Menu } = require('electron');
const ComparisonController = require('./controllers/comparison');
const menu = require('./menu');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    icon: '../icons/icon.png'
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.maximize();
};

const initControllers = () => {
  new ComparisonController();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
app.on('ready', initControllers);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const settingsJSONTemplate = `{
  "pageLoadTimeout": 1500,
  "viewports": [
    1980,
    768,
    390
  ]
}`;

const createSettingsFile = () => {
  const filePath = path.resolve('settings.json');
  if (fs.existsSync(filePath)) return;
  fs.writeFileSync(filePath, settingsJSONTemplate);
}

createSettingsFile();

Menu.setApplicationMenu(menu);
