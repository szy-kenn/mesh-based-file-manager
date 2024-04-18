const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');

const fs = require("fs");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minHeight: 300,
    minWidth: 400,
    show: false,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#080a0d",
      symbolColor: "#95B8F1",
      height: 45
    },
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.maximize();
  mainWindow.show();

  mainWindow.on("closed", () => win = null);

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("file-access-ready");
  });

  ipcMain.handle("get-directory", () => {
    // const { filePaths }  = await dialog.showOpenDialog({
    //   properties: ["openDirectory"],
    // });

    // console.log(filePaths)

    return readDirectory("C:/");

    // if (filePaths) {
    //   return await readDirectory(filePaths[0]);
    // } else {
    //   return null;
    // }

  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


function readDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  console.log("Directory: ", dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);

    console.log("File: ", file)
    console.log("File Path: ", filePath);

    try {
      const stats = fs.statSync(filePath);
      console.log(stats)
    } catch (err) {
      console.log(err)
    }

  }

  return files;
}